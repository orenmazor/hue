rm -rf ../../desktop/core/src/desktop/static/desktop/js/ace/*
node ./Makefile.dryice.js minimal --m --nc --s --target ../../desktop/core/src/desktop/static/desktop/js/ace/
mv ../../desktop/core/src/desktop/static/desktop/js/ace/src-min-noconflict/* ../../desktop/core/src/desktop/static/desktop/js/ace/
rmdir ../../desktop/core/src/desktop/static/desktop/js/ace/src-min-noconflict
echo "Done!"
