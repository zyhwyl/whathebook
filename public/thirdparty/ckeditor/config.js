/**
 * @license Copyright (c) 2003-2013, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function(config) {
	// Define changes to default configuration here. For example:
	// config.language = 'fr';
	// config.uiColor = '#AADC6E';
	config.extraPlugins = 'syntaxhighlight';
	config.filebrowserUploadUrl="ckeditor/ckeditorUpload";
};
CKEDITOR.config.format_tags = "h1;h2";
CKEDITOR.config.format_h1 = {element: "h3"};
CKEDITOR.config.format_h2 = {element: "h4"};
