var Module=typeof pyodide._module!=="undefined"?pyodide._module:{};Module.checkABI(1);if(!Module.expectedDataFileDownloads){Module.expectedDataFileDownloads=0;Module.finishedDataFileDownloads=0}Module.expectedDataFileDownloads++;(function(){var loadPackage=function(metadata){var PACKAGE_PATH;if(typeof window==="object"){PACKAGE_PATH=window["encodeURIComponent"](window.location.pathname.toString().substring(0,window.location.pathname.toString().lastIndexOf("/"))+"/")}else if(typeof location!=="undefined"){PACKAGE_PATH=encodeURIComponent(location.pathname.toString().substring(0,location.pathname.toString().lastIndexOf("/"))+"/")}else{throw"using preloaded data can only be done on a web page or in a web worker"}var PACKAGE_NAME="pyparsing.data";var REMOTE_PACKAGE_BASE="pyparsing.data";if(typeof Module["locateFilePackage"]==="function"&&!Module["locateFile"]){Module["locateFile"]=Module["locateFilePackage"];err("warning: you defined Module.locateFilePackage, that has been renamed to Module.locateFile (using your locateFilePackage for now)")}var REMOTE_PACKAGE_NAME=Module["locateFile"]?Module["locateFile"](REMOTE_PACKAGE_BASE,""):REMOTE_PACKAGE_BASE;var REMOTE_PACKAGE_SIZE=metadata.remote_package_size;var PACKAGE_UUID=metadata.package_uuid;function fetchRemotePackage(packageName,packageSize,callback,errback){var xhr=new XMLHttpRequest;xhr.open("GET",packageName,true);xhr.responseType="arraybuffer";xhr.onprogress=function(event){var url=packageName;var size=packageSize;if(event.total)size=event.total;if(event.loaded){if(!xhr.addedTotal){xhr.addedTotal=true;if(!Module.dataFileDownloads)Module.dataFileDownloads={};Module.dataFileDownloads[url]={loaded:event.loaded,total:size}}else{Module.dataFileDownloads[url].loaded=event.loaded}var total=0;var loaded=0;var num=0;for(var download in Module.dataFileDownloads){var data=Module.dataFileDownloads[download];total+=data.total;loaded+=data.loaded;num++}total=Math.ceil(total*Module.expectedDataFileDownloads/num);if(Module["setStatus"])Module["setStatus"]("Downloading data... ("+loaded+"/"+total+")")}else if(!Module.dataFileDownloads){if(Module["setStatus"])Module["setStatus"]("Downloading data...")}};xhr.onerror=function(event){throw new Error("NetworkError for: "+packageName)};xhr.onload=function(event){if(xhr.status==200||xhr.status==304||xhr.status==206||xhr.status==0&&xhr.response){var packageData=xhr.response;callback(packageData)}else{throw new Error(xhr.statusText+" : "+xhr.responseURL)}};xhr.send(null)}function handleError(error){console.error("package error:",error)}var fetchedCallback=null;var fetched=Module["getPreloadedPackage"]?Module["getPreloadedPackage"](REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE):null;if(!fetched)fetchRemotePackage(REMOTE_PACKAGE_NAME,REMOTE_PACKAGE_SIZE,function(data){if(fetchedCallback){fetchedCallback(data);fetchedCallback=null}else{fetched=data}},handleError);function runWithFS(){function assert(check,msg){if(!check)throw msg+(new Error).stack}Module["FS_createPath"]("/","lib",true,true);Module["FS_createPath"]("/lib","python3.7",true,true);Module["FS_createPath"]("/lib/python3.7","site-packages",true,true);Module["FS_createPath"]("/lib/python3.7/site-packages","pyparsing-2.4.5-py3.7.egg-info",true,true);function DataRequest(start,end,audio){this.start=start;this.end=end;this.audio=audio}DataRequest.prototype={requests:{},open:function(mode,name){this.name=name;this.requests[name]=this;Module["addRunDependency"]("fp "+this.name)},send:function(){},onload:function(){var byteArray=this.byteArray.subarray(this.start,this.end);this.finish(byteArray)},finish:function(byteArray){var that=this;Module["FS_createPreloadedFile"](this.name,null,byteArray,true,true,function(){Module["removeRunDependency"]("fp "+that.name)},function(){if(that.audio){Module["removeRunDependency"]("fp "+that.name)}else{err("Preloading file "+that.name+" failed")}},false,true);this.requests[this.name]=null}};function processPackageData(arrayBuffer){Module.finishedDataFileDownloads++;assert(arrayBuffer,"Loading data file failed.");assert(arrayBuffer instanceof ArrayBuffer,"bad input to processPackageData");var byteArray=new Uint8Array(arrayBuffer);var curr;var compressedData={data:null,cachedOffset:152027,cachedIndexes:[-1,-1],cachedChunks:[null,null],offsets:[0,1622,3117,4280,5402,6784,8320,9489,10875,11957,13179,14259,15145,15916,17117,18222,19414,20561,21800,22775,23956,24612,25818,26947,28154,29486,30683,31893,33090,34442,35611,36704,37510,38397,39126,40227,41479,42755,43929,45132,46214,47502,48211,49194,50019,50477,51711,52927,53970,55235,56394,57437,58688,59731,60839,62124,63163,64393,65478,66852,68052,68950,70280,71524,72488,73640,74495,75604,76970,78205,79261,80258,81184,82318,83197,84338,85402,86567,87709,88917,90024,91397,92358,93440,94418,95709,96989,98342,99536,100697,101895,103114,104368,105465,106839,107850,109071,110314,111480,112732,114065,115181,116616,117775,119112,120477,121864,123268,124481,125626,126975,128192,129589,130837,131736,132879,134221,134798,136105,137026,138381,139348,140267,141355,142323,143657,144848,145689,146481,147614,148718,149780,151198],sizes:[1622,1495,1163,1122,1382,1536,1169,1386,1082,1222,1080,886,771,1201,1105,1192,1147,1239,975,1181,656,1206,1129,1207,1332,1197,1210,1197,1352,1169,1093,806,887,729,1101,1252,1276,1174,1203,1082,1288,709,983,825,458,1234,1216,1043,1265,1159,1043,1251,1043,1108,1285,1039,1230,1085,1374,1200,898,1330,1244,964,1152,855,1109,1366,1235,1056,997,926,1134,879,1141,1064,1165,1142,1208,1107,1373,961,1082,978,1291,1280,1353,1194,1161,1198,1219,1254,1097,1374,1011,1221,1243,1166,1252,1333,1116,1435,1159,1337,1365,1387,1404,1213,1145,1349,1217,1397,1248,899,1143,1342,577,1307,921,1355,967,919,1088,968,1334,1191,841,792,1133,1104,1062,1418,829],successes:[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]};compressedData.data=byteArray;assert(typeof Module.LZ4==="object","LZ4 not present - was your app build with  -s LZ4=1  ?");Module.LZ4.loadPackage({metadata:metadata,compressedData:compressedData});Module["removeRunDependency"]("datafile_pyparsing.data")}Module["addRunDependency"]("datafile_pyparsing.data");if(!Module.preloadResults)Module.preloadResults={};Module.preloadResults[PACKAGE_NAME]={fromCache:false};if(fetched){processPackageData(fetched);fetched=null}else{fetchedCallback=processPackageData}}if(Module["calledRun"]){runWithFS()}else{if(!Module["preRun"])Module["preRun"]=[];Module["preRun"].push(runWithFS)}};loadPackage({files:[{filename:"/lib/python3.7/site-packages/pyparsing.py",start:0,end:264192,audio:0},{filename:"/lib/python3.7/site-packages/pyparsing-2.4.5-py3.7.egg-info/SOURCES.txt",start:264192,end:267756,audio:0},{filename:"/lib/python3.7/site-packages/pyparsing-2.4.5-py3.7.egg-info/PKG-INFO",start:267756,end:271995,audio:0},{filename:"/lib/python3.7/site-packages/pyparsing-2.4.5-py3.7.egg-info/top_level.txt",start:271995,end:272005,audio:0},{filename:"/lib/python3.7/site-packages/pyparsing-2.4.5-py3.7.egg-info/dependency_links.txt",start:272005,end:272006,audio:0}],remote_package_size:156123,package_uuid:"1ce6b53f-47f2-404a-a653-9ea11ca51ff8"})})();