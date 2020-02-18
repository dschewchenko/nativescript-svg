[![npm](https://img.shields.io/npm/v/@dschewchenko/nativescript-svg.svg)](https://www.npmjs.com/package/@dschewchenko/nativescript-svg)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
# NativeScript SVG

***This repo is a fork of [peoplewareDo/nativescript-svg](https://github.com/peoplewareDo/nativescript-svg).***

## Install
`tns plugin add @dschewchenko/nativescript-svg`


### Usage

You use it in the same way you use Image source.

Android Library | iOS CocoaPod
--------------- | ------------
[BigBadaboom androidsvg](https://github.com/BigBadaboom/androidsvg) | [SVGKit by SVGKit](https://github.com/SVGKit/SVGKit)

** there are limitations: **
    - saveToFile ins't working

### Quick start
```js
var ImageSourceSVGModule = require("@dschewchenko/nativescript-svg");
var svgFile = new ImageSourceSVGModule.ImageSourceSVG();

var loaded = svgFile.fromResource('foxie');

var path = '//somepath/file.svg';
loaded = svgFile.loadFromFile(path);

var url = 'http://somepath/file.svg';
loaded = svgFile.loadFromUrl(url);

if(loaded){
    console.log("object loaded");
} else {
    console.log("error");
}
```

## API

##### ImageSourceSVGModule.fromResource(name: string): ImageSourceSVG
- Loads this instance from the specified resource name.

##### ImageSourceSVGModule.fromFile(path: string): ImageSourceSVG
- Creates a new ImageSourceSVG instance and loads it from the specified file.

##### ImageSourceSVGModule.fromData(data: any): ImageSourceSVG
- Creates a new ImageSourceSVG instance and loads it from the specified resource name.

##### ImageSourceSVGModule.fromBase64(source: string): ImageSourceSVG
- Creates a new ImageSourceSVG instance and loads it from the specified resource name.

##### ImageSourceSVGModule.fromBase64(source: string): ImageSourceSVG
- Creates a new ImageSourceSVG instance and loads it from the specified resource name.

##### ImageSourceSVGModule.fromUrl(url: string): Promise:ImageSourceSVG
- Downloads the image from the provided Url and creates a new ImageSourceSVG instance from it.

***
You can call every method in two ways, for example:
```
//from the svf file object
svgFile.loadFromResource(name: string): boolean  // synchronously
svgFile.fromResource(name: string): ImageSourceSVG //asynchronously
```
or 
```
//from the svg module api
ImageSourceSVGModule.fromResource(name: string): ImageSourceSVG
```

Since ver 1.1 Implement a similar image tag to be used as for example:
```xml
<Page xmlns="http://schemas.nativescript.org/tns.xsd"
      xmlns:svg="nativescript-svg" loaded="pageLoaded">
  <StackLayout>
    <!--svg image tag-->
    <svg:SVGImage src="~/image/nativescript.svg" height="100" />
    <svg:SVGImage src="https://media4.giphy.com/media/3uyIgVxP1qAjS/200.svg" height="200" />

    <!--normal image tag-->
    <Image src="~/images/logo.svg" stretch ="none" />    
  </StackLayout> 
</Page>  
```


