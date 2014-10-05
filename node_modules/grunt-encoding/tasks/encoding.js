/*
 * grunt-encoding
 * https://github.com/pigulla/grunt-encoding
 *
 * Copyright (c) 2013 Raphael Pigulla
 * Licensed under the MIT license.
 */
'use strict';

var spawn = require('child_process').spawn,
    async = require('async'),
    util = require('util'),
    path = require('path'),
    which = require('which');

function execIconv(executable, args, callback) {
    var iconv = spawn(executable, args),
        stderr = '',
        stdout = '',
        error;

    iconv.stdout.on('data', function (data) {
        stdout += data.toString();
    });
    iconv.stderr.on('data', function (data) {
        stderr += data.toString();
    });
    iconv.on('error', function (err) {
        error = err;
    });
    iconv.on('close', function (code) {
        if (!error) {
            callback(null, code, stdout, stderr);
        } else {
            callback(new Error('could not spawn iconv (' + error.message + ')'));
        }
    });
}

function getIconvVersion(executable, callback) {
    execIconv(executable, ['--version'], function (err, code, stdout) {
        if (err) {
            callback(err);
        } else if (code !== 0) {
            callback(new Error('iconv exited with code ' + code));
        } else {
            var matches = stdout.match(/^iconv (?:.+?) (\d+\.\d+(?:\.\d+)?)$/m);
            callback(null, matches ? matches[1] : '<unknown>');
        }
    });
}

function getSupportedEncodings(executable, callback) {
    execIconv(executable, ['--list'], function (err, code, stdout) {
        if (err) {
            callback(err);
        } else if (code !== 0) {
            callback(new Error('iconv exited with code ' + code));
        } else {
            callback(null, stdout.trim().split("\n"));
        }
    });
}

function assertEncodingSupport(executable, encoding, callback) {
    getSupportedEncodings(executable, function (err, encodings) {
        if (err) {
            callback(err);
            return;
        }

        if (encodings.indexOf(encoding) < 0 && encodings.indexOf(encoding + '//') < 0) {
            callback(new Error('iconv does not support encoding "' + encoding + '"'));
        } else {
            callback();
        }
    });
}

function runIconv(executable, file, encoding, callback) {
    execIconv(executable, ['--from-code', encoding, file], function (err, code, stdout, stderr) {
        if (err) {
            callback(new Error('could not check encoding with iconv (' + error.message + ')'));
        } else if (code === 0) {
            callback(null, true);
        } else {
            var messages = stderr.trim().split('\n').map(function (message) {
                var msg = message.match(/^[^:]+: (.+)$/);
                return msg ? msg[1] : message;
            });
            callback(null, false, messages);
        }
    });
}

module.exports = function (grunt) {
    grunt.registerMultiTask('encoding', 'Check character encoding of files.', function () {
        var done = this.async(),
            self = this;

        // Merge task-specific and/or target-specific options with these defaults.
        var executable,
            options = this.options({
                encoding: 'UTF8',
                iconv: null
            });

        async.waterfall([
            function (cb) {
                if (options.iconv === null) {
                    which('iconv', cb);
                } else {
                    if (grunt.file.exists(options.iconv) &&
                        (grunt.file.isFile(options.iconv) || grunt.file.isLink(options.iconv))
                    ) {
                        cb(null, options.iconv);
                    } else {
                        cb(new Error('iconv executable "' + options.iconv + '" not found'));
                    }
                }
            },
            function (file, cb) {
                executable = file;
                grunt.verbose.ok('Using executable "' + executable + '"');
                getIconvVersion(executable, cb);
            },
            function (version, cb) {
                grunt.verbose.ok('iconv found (version ' + version + ')');
                assertEncodingSupport(executable, options.encoding, cb);
            },
            function (cb) {
                var errors = 0,
                    files = self.filesSrc.filter(function (file) {
                        return grunt.file.isFile(file);
                    });

                async.eachLimit(files, 5, function (file, cb) {
                    runIconv(executable, file, options.encoding, function (err, ok, messages) {
                        if (err) {
                            cb(err);
                        } else if (ok) {
                            grunt.verbose.ok(util.format('File ok: %s', file));
                            cb();
                        } else {
                            errors++;
                            messages.forEach(function (message) {
                                grunt.verbose.warn(util.format(
                                    'Problem with file %s: %s',
                                    file, message
                                ));
                            });
                            cb();
                        }
                    });
                }, function (err) {
                    cb(err, errors);
                });
            }
        ], function (err, errors) {
            if (err) {
                grunt.fail.warn(err.message);
            } else if (errors) {
                grunt.fail.warn(errors + ' files are not encoded correctly')
            } else {
                grunt.log.ok('All files are encoded correctly');
            }
            done();
        });
    });
};
