module.exports = function (api) {
    api.cache(true);
  
    const presets = [ "@babel/preset-env", 
                      "@babel/react" ];
    const plugins = [ "@babel/plugin-syntax-dynamic-import",
                      "@babel/plugin-proposal-class-properties",
                      "babel-plugin-styled-components" ];    
  
    return {
      presets,
      plugins
    };
  }