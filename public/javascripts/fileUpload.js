FilePond.registerPlugin(FilePondPluginImagePreview, FilePondPluginImageResize, FilePondPluginFileEncode);
FilePond.setOptions({
	stylePanelAspectRatio: 9 / 8,
	// imageResizeTargetWidth: 100,
	// imageResizeTargetHeight: 150,
});

FilePond.parse(document.body);
