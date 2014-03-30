<?php
/**
 * In dieser Datei werden die Grundeinstellungen f�r WordPress vorgenommen.
 *
 * Zu diesen Einstellungen geh�ren: MySQL-Zugangsdaten, Tabellenpr�fix,
 * Secret-Keys, Sprache und ABSPATH. Mehr Informationen zur wp-config.php gibt es auf der {@link http://codex.wordpress.org/Editing_wp-config.php
 * wp-config.php editieren} Seite im Codex. Die Informationen f�r die MySQL-Datenbank bekommst du von deinem Webhoster.
 *
 * Diese Datei wird von der wp-config.php-Erzeugungsroutine verwendet. Sie wird ausgef�hrt, wenn noch keine wp-config.php (aber eine wp-config-sample.php) vorhanden ist,
 * und die Installationsroutine (/wp-admin/install.php) aufgerufen wird.
 * Man kann aber auch direkt in dieser Datei alle Eingaben vornehmen und sie von wp-config-sample.php in wp-config.php umbenennen und die Installation starten.
 *
 * @package WordPress
 */
 
/** ACTIVATE LOCALHOST UPLOAD */
define( 'FS_METHOD', 'direct');

/**  MySQL Einstellungen - diese Angaben bekommst du von deinem Webhoster. */
/**  Ersetze database_name_here mit dem Namen der Datenbank, die du verwenden m�chtest. */
define('DB_NAME', 'usr_web676_26');
/** Ersetze username_here mit deinem MySQL-Datenbank-Benutzernamen */
define('DB_USER', 'web676');
/** Ersetze password_here mit deinem MySQL-Passwort */
define('DB_PASSWORD', '1367secg0');
/** Ersetze localhost mit der MySQL-Serveradresse */
define('DB_HOST', 'localhost');
/** Der Datenbankzeichensatz der beim Erstellen der Datenbanktabellen verwendet werden soll */
define('DB_CHARSET', 'utf8');
/** Der collate type sollte nicht ge�ndert werden */
define('DB_COLLATE', '');

/**#@+
 * Sicherheitsschl�ssel
 *
 * �ndere jeden KEY in eine beliebige, m�glichst einzigartige Phrase. 
 * Auf der Seite {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service} kannst du dir alle KEYS generieren lassen.
 * Bitte trage f�r jeden KEY eine eigene Phrase ein. Du kannst die Schl�ssel jederzeit wieder �ndern, alle angemeldeten Benutzer m�ssen sich danach erneut anmelden.
 *
 * @seit 2.6.0
 */
define('AUTH_KEY',         'put your unique phrase here');
define('SECURE_AUTH_KEY',  'put your unique phrase here');
define('LOGGED_IN_KEY',    'put your unique phrase here');
define('NONCE_KEY',        'put your unique phrase here');
define('AUTH_SALT',        'put your unique phrase here');
define('SECURE_AUTH_SALT', 'put your unique phrase here');
define('LOGGED_IN_SALT',   'put your unique phrase here');
define('NONCE_SALT',       'put your unique phrase here');

/**#@-*/

/**
 * WordPress Datenbanktabellen-Pr�fix
 *
 *  Wenn du verschiedene Pr�fixe benutzt, kannst du innerhalb einer Datenbank
 *  verschiedene WordPress-Installationen betreiben. Nur Zahlen, Buchstaben und Unterstriche bitte!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Sprachdatei
 *
 * Hier kannst du einstellen, welche Sprachdatei benutzt werden soll. Die entsprechende
 * Sprachdatei muss im Ordner wp-content/languages vorhanden sein, beispielsweise de_DE.mo
 * Wenn du nichts eintr�gst, wird Englisch genommen.
 */
define('WPLANG', 'de_DE');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');