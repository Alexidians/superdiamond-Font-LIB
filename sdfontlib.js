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
  var font = await request.text();
  SDFonts.fonts[name] = font;
 }
}
