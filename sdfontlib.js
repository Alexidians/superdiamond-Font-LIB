var SDFonts = {
 fonts: {},
 GenFont: function(name, ...params) {
   if(SDFonts.fonts[name].type == "custom") {
    eval("var func = " + SDFonts.fonts[name].functionString);
    return func(...params);
   }
   if(SDFonts.fonts[name].type == "mapping") {
    var mapping = SDFonts.fonts[name].mapping
    return params[0].split('').map(char => mapping[char] || char).join('');
   }
 },
 load: async function(url,name) {
  var request = await fetch(url);
  var UnParsedFontString = await request.text();
  var HalfParsedFontString = UnParsedFontString.replace(/\/\/.*?\n/g, '');
  var StringFont = HalfParsedFontString.replace(/\/\*[\s\S]*?\*\//g, '');
  var font = JSON.parse(StringFont);
  SDFonts.fonts[name] = font;
 }
}
