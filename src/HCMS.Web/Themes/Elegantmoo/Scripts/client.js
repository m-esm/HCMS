if (typeof (lschatInitialized) == "undefined") {
    var lschatInitialized = true;
    var scripts = document.getElementsByTagName('script');
    var srcParams = scripts[scripts.length - 1].src.split('?')[1];
    var isInPopup = srcParams.indexOf("&popup=true") != -1;
    var popupOnly = srcParams.indexOf("&popupOnly=true") != -1;
    var isInTestMode = "";
    var isDirectChatPage = "";
    var useSignalR = "";
    var SKIN_CLASSIC = "Classic";
    var SKIN_MODERN = "Modern";
    if (srcParams.indexOf("acc=") != -1) {
        var accId = srcParams.substring(srcParams.indexOf("acc=") + "acc=".length);
        if (accId.indexOf("&") != -1) {
            accId = accId.substring(0, accId.indexOf("&"));
        }
        var accIdTrimmed = accId.replace(/ +/g, "");
        if (accIdTrimmed.length > 0) {
            var prefferedLng = "";
            if (srcParams.indexOf("lng=") != -1) {
                prefferedLng = srcParams.substring(srcParams.indexOf("lng=") + "lng=".length);
                if (prefferedLng.indexOf("&") != -1) {
                    prefferedLng = prefferedLng.substring(0, prefferedLng.indexOf("&"));
                }
            }
            var skin = "";
            if (srcParams.indexOf("skin=") != -1) {
                skin = srcParams.substring(srcParams.indexOf("skin=") + "skin=".length);
                if (skin.indexOf("&") != -1) {
                    skin = skin.substring(0, skin.indexOf("&"));
                }
            }
            if (srcParams.indexOf("directchatpage=") != -1) {
                isDirectChatPage = srcParams.substring(srcParams.indexOf("directchatpage=") + "directchatpage=".length);
                if (isDirectChatPage.indexOf("&") != -1) {
                    isDirectChatPage = isDirectChatPage.substring(0, isDirectChatPage.indexOf("&"));
                }
            }
            if (isDirectChatPage.length > 0) {
                isDirectChatPage = "&directchatpage=true";
            }
            if (srcParams.indexOf("test=") != -1) {
                isInTestMode = srcParams.substring(srcParams.indexOf("test=") + "test=".length);
                if (isInTestMode.indexOf("&") != -1) {
                    isInTestMode = isInTestMode.substring(0, isInTestMode.indexOf("&"));
                }
            }
            if (isInTestMode.length > 0) {
                isInTestMode = "&test=true";
            }
            var clientGUIhtm = "clientGUI.htm";
            if (skin == SKIN_MODERN)
            {
                clientGUIhtm = "clientGUI2.htm";
            }
            if (srcParams.indexOf("useSignalR=") != -1) {
                useSignalR = srcParams.substring(srcParams.indexOf("useSignalR=") + "useSignalR=".length);
                if (useSignalR.indexOf("&") != -1) {
                    useSignalR = useSignalR.substring(0, useSignalR.indexOf("&"));
                }
            }
            if (useSignalR.length > 0) {
                useSignalR = "&useSignalR=true";
                clientGUIhtm = "clientGUISignalR.htm";
            }

            var minJQVersion = "1.5.0";
            var jqSMAvailable = false;

            var path = scripts[scripts.length - 1].src.split('?')[0]; // remove any ?query when script is included
            //TODO: After that, parse unique site id that was included after ? in the script
            var scriptDir = path.split('/').slice(0, -1).join('/') + '/'; // remove last filename part of path
            if (scriptDir.indexOf("supportmobi.com") != -1) {//fix for older sites that still use the supportmobi script
                scriptDir = scriptDir.replace("supportmobi.com", "livesupporti.com");
            }
            var currentLocation = document.location.href;
            var originalUri = "";
            if (isInPopup && srcParams.indexOf("originalUri=") != -1) {//if in popup - just get the parent page URI from the request params
                if (!popupOnly)
                {
                    originalUri = srcParams.substring(srcParams.indexOf("originalUri=") + "originalUri=".length);
                    if (originalUri.indexOf("&") != -1) {
                        originalUri = originalUri.substring(0, originalUri.indexOf("&"));
                    }
                    originalUri = "&originalUri=" + originalUri;
                    currentLocation = isInTestMode.length == 0 ? "https://livesupporti.com/" : "http://localhost/livesupporti/";
                }
                else
                {
                    currentLocation = srcParams.substring(srcParams.indexOf("originalUri=") + "originalUri=".length);
                    if (currentLocation.indexOf("&") != -1) {
                        currentLocation = currentLocation.substring(0, currentLocation.indexOf("&"));
                    }
                }
            }
            var scriptDomain = "";  // //get rid of protocol first, before getting domain name
            var scriptPrefix = "";
            if (scriptDir.indexOf("https://") != -1) {
                scriptPrefix = "https://";
            } else {
                scriptPrefix = "http://";
            }
            scriptDomain = scriptDir.substring(scriptPrefix.length);
            scriptDomain = scriptDomain.split('/')[0]; //get domain name only
            scriptDomain = scriptPrefix + scriptDomain;

            //add stylesheet for the client chat window
            var head = document.getElementsByTagName('head')[0];
            var link = document.createElement('link');
            link.rel = "stylesheet";
            link.type = "text/css";
            if (skin.length == 0 || skin == SKIN_CLASSIC) {
                link.href = scriptDir + "../Styles/parentChatGUI.css";
            }
            else if (skin == SKIN_MODERN) {
                link.href = scriptDir + "../Styles/parentChatGUI2.css";
            }
            link.media = 'all';
            head.appendChild(link);
            var animationCss = document.createElement('link');
            animationCss.rel = "stylesheet";
            animationCss.type = "text/css";
            animationCss.href = scriptDir + "../Styles/animate.min.css";
            head.appendChild(animationCss);

            //add all scripts and the main iframe
            if (typeof jQuery != 'undefined') {
                var vernums = jQuery.fn.jquery.split('.');
                if ((parseInt(vernums[0]) == 1 && parseInt(vernums[1]) >= 5) || parseInt(vernums[0]) == 2) {
                    jqSMAvailable = true;
                }
            } else {
                document.write("<script src='" + scriptDir + "jquery-1.6.2.min.js'></script>");
            }

            //*********** START - Identify client device and OS type
            var os = "",
                isMobileDeviceLS = false;
            if ("navigator" in window && "userAgent" in window.navigator) {
                var userAgent = window.navigator.userAgent.toLowerCase();
                var platform = window.navigator.platform;
                try {
                    //************** Mobile devices check - handles iPhone, iPad, Android and BlackBerry
                    var Device = {};
                    Device.Name = "";
                    Device.OSVersion = "";
                    Device.UA = window.navigator.userAgent;
                    Device.Types = ["iPhone", "iPod", "iPad", "Android", "webOS", "BlackBerry"];
                    for (var d = 0; d < Device.Types.length; d++) {
                        var t = Device.Types[d];
                        //match the Type against the User Agent
                        Device[t] = !!Device.UA.match(new RegExp(t, "i"));
                    }
                    if (Device.UA.indexOf("Windows Phone OS") != -1) {
                        os = Device.UA.substring(Device.UA.indexOf("Windows Phone OS"));
                        if (os.indexOf(";") != -1) {
                            os = os.substring(0, os.indexOf(";"));
                        }
                        isMobileDeviceLS = true;
                    } else if (Device.UA.indexOf("XBLWP7") != -1) {
                        os = "Windows Phone OS 7.0";
                        isMobileDeviceLS = true;
                    } else if (Device.iPhone || Device.iPod || Device.iPad) {// is this an Apple device?
                        //check verion of Apple OS
                        var iOSVersionRegex = new RegExp(/(OS (?:\d+[\._]?)+)/);
                        var iOSResult = iOSVersionRegex.exec(Device.UA);

                        if (Device.iPhone) { Device.Name = "iPhone"; }
                        if (Device.iPod) { Device.Name = "iPod"; }
                        if (Device.iPad) { Device.Name = "iPad"; }

                        if (iOSResult != null) {
                            for (i = 0; i < iOSResult.length; i++) {
                                if (iOSResult[i] != undefined) {
                                    Device.OSVersion = iOSResult[i].replace("OS ", "iOS ");
                                    Device.OSVersion = Device.OSVersion.replace(/\_/g, ".");
                                }
                            }
                        }
                        os = Device.Name + ", " + Device.OSVersion;
                        isMobileDeviceLS = true;
                    } else if (Device.Android) {
                        Device.Name = "Android"
                        var AndroidVersionRegex = new RegExp(/(Android (?:\d+\S*[\._]?)+)/);
                        var AndroidResult = AndroidVersionRegex.exec(Device.UA);
                        if (AndroidResult != null) {
                            for (i = 0; i < AndroidResult.length; i++) {
                                if (AndroidResult[i] != undefined) {
                                    Device.OSVersion = AndroidResult[i].replace("Android ", "").replace(/\_/g, ".").replace(";", "");
                                }
                            }
                        }
                        if (Device.UA.toLowerCase().indexOf("mobile") != -1) {
                            //this is an Android phone
                            os = "Mobile phone, " + Device.Name + " " + Device.OSVersion;
                        } else {
                            os = "Tablet, " + Device.Name + " " + Device.OSVersion;
                        }
                        isMobileDeviceLS = true;
                    } else if (Device.BlackBerry) {
                        Device.Name = "BlackBerry"
                        //Older BlackBerry User Agent strings differ from new ones, so we need to check for both formats
                        var BBVersionRegex = new RegExp(/BlackBerry\d{3,4}[A-Za-z]*\/((?:\d+\.?){2,4})|Version\/((?:\d+\.?){2,4})/);
                        var BBResult = BBVersionRegex.exec(Device.UA);
                        if (BBResult != null) {
                            for (i = 0; i < BBResult.length; i++) {
                                if (BBResult[i] != undefined) {
                                    Device.OSVersion = BBResult[i].replace(/\_/g, ".");
                                }
                            }
                        }
                        os = Device.Name + " " + Device.OSVersion;
                        isMobileDeviceLS = true;
                    } else if (/windows nt 5.0/.test(userAgent)) {
                        os = "Windows 2000";
                    } else if (/windows nt 5.1/.test(userAgent)) {
                        os = "Windows XP";
                    } else if (/windows nt 5.2/.test(userAgent)) {
                        os = "Windows Server 2003";
                    } else if (/windows nt 6.0/.test(userAgent)) {
                        os = "Windows Vista";
                    } else if (/windows nt 6.1/.test(userAgent)) {
                        os = "Windows 7";
                    } else if (/windows nt 6.2/.test(userAgent)) {
                        os = "Windows 8";
                    } else if (/windows nt 10.0/.test(userAgent)) {
                        os = "Windows 10";
                    } else if (/windows nt 4.0/.test(userAgent)) {
                        os = "Windows NT 4.0";
                    } else if (/win 9x 4.90/.test(userAgent)) {
                        os = "Windows ME";
                    } else if (/windows 98/.test(userAgent)) {
                        os = "Windows 98";
                    } else if (/windows 95/.test(userAgent)) {
                        os = "Windows 95";
                    } else if (/windows ce/.test(userAgent)) {
                        os = "Windows CE";
                        isMobileDeviceLS = true;//95% of the devices are portable, with small screen resolutions
                    } else if (/windows/.test(userAgent)) {
                        os = "Windows";
                    } else if (/linux/.test(userAgent)) {
                        os = "Linux";
                    } else if (/x11/.test(userAgent)) {
                        os = "Linux";
                    } else if (platform === 'MacIntel' || platform === 'MacPPC') {
                        os = 'Mac OS X';
                        osversion = /10[\.\_\d]+/.exec(userAgent)[0];
                        if (/[\_]/.test(osversion)) {
                            osversion = osversion.split('_').join('.');
                        }
                        os += " " + osversion;
                    }
                } catch (err) {
                    //user browser detection is surrounded by try-catch, so it doesn't prevent the chat from loading.
                    //this is done because not every userAgent can be handled in the browser detection code, so exceptions may occur sometimes!
                }
            }
            //*********** END - Identify client device and OS type
            var docRefParam = "&ref=";
            if ("referrer" in document && document.referrer.length > 0) {
                docRefParam = "&ref=" + document.referrer;
            }
            if (userAgent.indexOf("opera mini/") == -1) {
                var poweredByColor = "#FFFFFF";
                if (skin == SKIN_CLASSIC) {
                    poweredByColor = "#B2B2B2";
                }
                document.write("<script src='" + scriptDir + "jquery.ba-postmessage.min.js'></script>");
                document.write('<style type="text/css">div.linkHolder a:visited{color:#FFFFFF !important;} div.linkHolder a img {border: none; } .livesupporti-body-touch{position:fixed;overflow-y:hidden;}</style>');
                document.write("<div id='chatContainer' class='chatContainer' style='display:none;z-index:1000000;'><div id='divClosedChatBarImage' style='display:none;'><img id='imgClosedChatBarImage' style='position:absolute;top:0px;left:50%;display:block;margin-top:-140px;margin-left:-100px;width:200px;max-width:200px;cursor:pointer;' src='about:blank'/></div><div class='livesupporti-transparent'></div><div style='width:100%;height:100%;position:relative;'><div id='chatMoveContainer' style='position: absolute; top: 0px; left: 0px; width: 265px; height: 38px; cursor: move; display: none;'></div><iframe style='width:100%;height:100%;margin:0px;padding:0px;float:none;border:0px;top:0px;right:0px;bottom:0px;left:0px;background-color:transparent;' src='" + scriptDir + "../Views/" + clientGUIhtm + "?location=" + currentLocation + "&acc=" + accId + "&lng=" + prefferedLng + "&os=" + os + "&mobile=" + isMobileDeviceLS + "&popup=" + isInPopup + isDirectChatPage + isInTestMode + useSignalR + originalUri + docRefParam + "' frameborder='0' scrolling='no' allowtransparency='true'" +
                    "id='LiveSupportiMainFrame' name='LiveSupportiMainFrame'></iframe></div>" +
                    "<div class='linkHolder' style='position:absolute !important;height:25px !important;bottom:0px !important;right:0px !important;text-align:center !important;'><a href='https://livesupporti.com' target='new' style='float:right !important;margin-top:7px !important;margin-right:14px !important;line-height:11px !important;text-decoration:none !important;outline:none !important;cursor:pointer !important;'><span style='height:11px !important;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:10px !important;color:" + poweredByColor + " !important;display:inline-block !important;' title='Live chat for your website'>Powered by LiveSupporti </span></a></div></div>");
                document.write("<script src='" + scriptDir + "clientCrossdomainFunctions.js?v=18'></script>");
            }
        } else {
            document.write("<div class='linkHolder' style='position: fixed; background-color: #3A454B; color: white; font-size: 17px; padding:5px 3px 2px 10px; height: 18px; bottom: 0px; right: 10px;font-family:Helvetica Neue, Helvetica, Arial, sans-serif;text-align:center'>LiveSupporti not installed properly. Get your product key from <a href='https://livesupporti.com/pk' target='new'><span style='font-family:Helvetica Neue, Helvetica, Arial, sans-serif;font-size:17px;font-weight:bold; color: #7777FF;'> LiveSupporti.com</span></a></div>");
        }
    }
}