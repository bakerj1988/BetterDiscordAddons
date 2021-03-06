﻿//META{"name":"JoinedAtDate"}*//

class JoinedAtDate {
	initConstructor () {
		this.labels = {};
		
		this.languages;
		
		this.loadedusers = {};
		
		this.joinedAtDateMarkup = `<div class="joinedAtDate ${BDFDB.disCN.textrow}"></div>`;
		
		this.css = `
			${BDFDB.dotCNS.userpopout + BDFDB.dotCN.nametag} {
				margin-bottom: 4px;
			}
			${BDFDB.dotCNS.themelight + BDFDB.dotCN.userpopoutheadernormal} .joinedAtDate {
				color: #b9bbbe; 
			}
			${BDFDB.dotCNS.themelight + BDFDB.dotCN.userpopoutheader}:not(${BDFDB.dotCN.userpopoutheadernormal}) .joinedAtDate,
			${BDFDB.dotCNS.themedark + BDFDB.dotCN.userpopoutheader} .joinedAtDate {
				color: hsla(0,0%,100%,.6);
			}
			${BDFDB.dotCNS.themelight + BDFDB.dotCN.userprofiletopsectionnormal} .joinedAtDate {
				color: hsla(216,4%,74%,.6); 
			}
			${BDFDB.dotCN.themelight} [class*='topSection']:not(${BDFDB.dotCN.userprofiletopsectionnormal}) .joinedAtDate,
			${BDFDB.dotCN.themedark} [class*='topSection'] .joinedAtDate {
				color: hsla(0,0%,100%,.6);
			}`;
			
			
		this.defaults = {
			settings: {
				addInUserPopout:		{value:true, 		description:"Add in User Popouts:"},
				addInUserProfil:		{value:true, 		description:"Add in User Profil Modal:"},
				addJoinedAtTime:		{value:true, 		description:"Display the Time when the User Joined:"},
				forceZeros:				{value:false, 		description:"Force leading Zeros:"}
			},
			choices: {
				joinedAtDateLang:		{value:"$discord", 	description:"Joined At Date Format:"}
			}
		};
	}

	getName () {return "JoinedAtDate";}

	getDescription () {return "Displays the Joined At Date of the current Server for a Member in the UserPopout and UserModal.";}

	getVersion () {return "1.0.2";}

	getAuthor () {return "DevilBro";}
	
	getSettingsPanel () {
		if (!this.started || typeof BDFDB !== "object") return;
		var settings = BDFDB.getAllData(this, "settings");
		var choices = BDFDB.getAllData(this, "choices");
		var settingshtml = `<div class="${this.getName()}-settings DevilBro-settings"><div class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.title + BDFDB.disCNS.size18 + BDFDB.disCNS.height24 + BDFDB.disCNS.weightnormal + BDFDB.disCN.marginbottom8}">${this.getName()}</div><div class="DevilBro-settings-inner">`;
		for (let key in settings) {
			settingshtml += `<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom8}" style="flex: 1 1 auto;"><h3 class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.title + BDFDB.disCNS.marginreset + BDFDB.disCNS.weightmedium + BDFDB.disCNS.size16 + BDFDB.disCNS.height24 + BDFDB.disCN.flexchild}" style="flex: 1 1 auto;">${this.defaults.settings[key].description}</h3><div class="${BDFDB.disCNS.flexchild + BDFDB.disCNS.switchenabled + BDFDB.disCNS.switch + BDFDB.disCNS.switchvalue + BDFDB.disCNS.switchsizedefault + BDFDB.disCNS.switchsize + BDFDB.disCN.switchthemedefault}" style="flex: 0 0 auto;"><input type="checkbox" value="${key}" class="${BDFDB.disCNS.switchinnerenabled + BDFDB.disCN.switchinner}"${settings[key] ? " checked" : ""}></div></div>`;
		}
		for (let key in choices) {
			settingshtml += `<div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.aligncenter + BDFDB.disCNS.nowrap + BDFDB.disCN.marginbottom8}" style="flex: 1 1 auto;"><h3 class="${BDFDB.disCNS.titledefault + BDFDB.disCNS.title + BDFDB.disCNS.weightmedium + BDFDB.disCNS.size16 + BDFDB.disCN.flexchild}" style="flex: 0 0 30%; line-height: 38px;">${this.defaults.choices[key].description}</h3><div class="${BDFDB.disCN.selectwrap}" style="flex: 1 1 70%;"><div class="${BDFDB.disCNS.select + BDFDB.disCNS.selectsingle + BDFDB.disCN.selecthasvalue}" type="${key}" value="${choices[key]}"><div class="${BDFDB.disCN.selectcontrol}"><div class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.alignbaseline + BDFDB.disCNS.nowrap + BDFDB.disCN.selectvalue}" style="flex: 1 1 auto;"><div class="${BDFDB.disCNS.title + BDFDB.disCNS.medium + BDFDB.disCNS.size16 + BDFDB.disCNS.height20 + BDFDB.disCNS.primary + BDFDB.disCN.weightnormal} languageName" style="flex: 1 1 42%; padding:0;">${this.languages[choices[key]].name}</div><div class="${BDFDB.disCNS.title + BDFDB.disCNS.medium + BDFDB.disCNS.size16 + BDFDB.disCNS.height20 + BDFDB.disCNS.primary + BDFDB.disCN.weightnormal} languageTimestamp" style="flex: 1 1 58%; padding:0;">${this.getJoinedTime(this.languages[choices[key]].id)}</div></div><span class="${BDFDB.disCN.selectarrowzone}"><span class="${BDFDB.disCN.selectarrow}"></span></span></div></div></div></div>`;
		}
		settingshtml += `</div></div>`;
		
		var settingspanel = $(settingshtml)[0];

		BDFDB.initElements(settingspanel);

		$(settingspanel)
			.on("click", BDFDB.dotCN.switchinner, () => {
				this.updateSettings(settingspanel);
				var choices = BDFDB.getAllData(this, "choices");
				for (let key in choices) {
					settingspanel.querySelector(`${BDFDB.dotCN.select}[type='${key}'] .languageTimestamp`).innerText = this.getJoinedTime(this.languages[choices[key]].id);
				}
			})
			.on("click", BDFDB.dotCN.selectcontrol, (e) => {this.openDropdownMenu(e);});
		return settingspanel;
	}

	//legacy
	load () {}

	start () {
		var libraryScript = null;
		if (typeof BDFDB !== "object" || BDFDB.isLibraryOutdated()) {
			if (typeof BDFDB === "object") BDFDB = "";
			libraryScript = document.querySelector('head script[src="https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDFDB.js"]');
			if (libraryScript) libraryScript.remove();
			libraryScript = document.createElement("script");
			libraryScript.setAttribute("type", "text/javascript");
			libraryScript.setAttribute("src", "https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDFDB.js");
			document.head.appendChild(libraryScript);
		}
		this.startTimeout = setTimeout(() => {this.initialize();}, 30000);
		if (typeof BDFDB === "object") this.initialize();
		else libraryScript.addEventListener("load", () => {this.initialize();});
	}

	initialize () {
		if (typeof BDFDB === "object") {
			BDFDB.loadMessage(this);
			
			this.CurrentGuildStore = BDFDB.WebModules.findByProperties(["getLastSelectedGuildId"]);
			this.APIModule = BDFDB.WebModules.findByProperties(["getAPIBaseURL"]);
			this.DiscordConstants = BDFDB.WebModules.findByProperties(["Permissions", "ActivityTypes", "StatusTypes"]);
			
			var observer = null;

			observer = new MutationObserver((changes, _) => {
				changes.forEach(
					(change, i) => {
						if (change.addedNodes) {
							change.addedNodes.forEach((node) => {
								if (node.tagName && node.querySelector(BDFDB.dotCN.userpopout)) {
									if (BDFDB.getData("addInUserPopout", this, "settings")) this.addJoinedAtDate(node.querySelector(BDFDB.dotCN.userpopoutheadertext), node);
								}
							});
						}
					}
				);
			});
			BDFDB.addObserver(this, BDFDB.dotCN.popouts, {name:"userPopoutObserver",instance:observer}, {childList: true});
			
			observer = new MutationObserver((changes, _) => {
				changes.forEach(
					(change, i) => {
						if (change.addedNodes) {
							change.addedNodes.forEach((node) => {
								if (node.tagName && node.querySelector(BDFDB.dotCN.userprofile)) {
									if (BDFDB.getData("addInUserProfil", this, "settings")) this.addJoinedAtDate(node.querySelector(BDFDB.dotCN.userprofileheaderinfo), null);
								}
							});
						}
					}
				);
			});
			BDFDB.addObserver(this, BDFDB.dotCN.app + " ~ [class^='theme-']:not([class*='popouts'])", {name:"userProfilModalObserver",instance:observer}, {childList: true});
			
			this.languages = Object.assign({},BDFDB.languages);
		}
		else {
			console.error(this.getName() + ": Fatal Error: Could not load BD functions!");
		}
	}


	stop () {
		if (typeof BDFDB === "object") {		
			BDFDB.unloadMessage(this);
		}
	}

	
	// begin of own functions

	updateSettings (settingspanel) {
		var settings = {};
		for (var input of settingspanel.querySelectorAll(BDFDB.dotCN.switchinner)) {
			settings[input.value] = input.checked;
		}
		BDFDB.saveAllData(settings, this, "settings");
	}
	
	openDropdownMenu (e) {
		var selectControl = e.currentTarget;
		var selectWrap = selectControl.parentElement;
		
		if (selectWrap.classList.contains(BDFDB.disCN.selectisopen)) return;
		
		selectWrap.classList.add(BDFDB.disCN.selectisopen);
		$("li").has(selectWrap).css("overflow", "visible");
		
		var type = selectWrap.getAttribute("type");
		var selectMenu = this.createDropdownMenu(selectWrap.getAttribute("value"), type);
		selectWrap.appendChild(selectMenu);
		
		$(selectMenu).on("mousedown." + this.getName(), BDFDB.dotCN.selectoption, (e2) => {
			var language = e2.currentTarget.getAttribute("value");
			selectWrap.setAttribute("value", language);
			selectControl.querySelector(".languageName").innerText = this.languages[language].name;
			selectControl.querySelector(".languageTimestamp").innerText = this.getJoinedTime(language);
			BDFDB.saveData(type, language, this, "choices");
		});
		$(document).on("mousedown.select" + this.getName(), (e2) => {
			if (e2.target.parentElement == selectMenu) return;
			$(document).off("mousedown.select" + this.getName());
			selectMenu.remove();
			$("li").has(selectWrap).css("overflow", "auto");
			setTimeout(() => {selectWrap.classList.remove(BDFDB.disCN.selectisopen);},100);
		});
	}
	
	createDropdownMenu (choice, type) {
		var menuhtml = `<div class="${BDFDB.disCN.selectmenuouter}"><div class="${BDFDB.disCN.selectmenu}">`;
		for (var key in this.languages) {
			var isSelected = key == choice ? ` ${BDFDB.disCN.selectselected}` : ``;
			menuhtml += `<div value="${key}" class="${BDFDB.disCNS.flex + BDFDB.disCNS.flex2 + BDFDB.disCNS.horizontal + BDFDB.disCNS.horizontal2 + BDFDB.disCNS.directionrow + BDFDB.disCNS.justifystart + BDFDB.disCNS.alignbaseline + BDFDB.disCNS.nowrap + BDFDB.disCN.selectoption + isSelected}" style="flex: 1 1 auto; display:flex;"><div class="${BDFDB.disCNS.title + BDFDB.disCNS.medium + BDFDB.disCNS.size16 + BDFDB.disCNS.height20 + BDFDB.disCNS.primary + BDFDB.disCN.weightnormal}" style="flex: 1 1 42%;">${this.languages[key].name}</div><div class="${BDFDB.disCNS.title + BDFDB.disCNS.medium + BDFDB.disCNS.size16 + BDFDB.disCNS.height20 + BDFDB.disCNS.primary + BDFDB.disCN.weightnormal}" style="flex: 1 1 58%;">${this.getJoinedTime(this.languages[key].id)}</div></div>`
		}
		menuhtml += `</div></div>`;
		return $(menuhtml)[0];
	}
	
	addJoinedAtDate (container, popout) {
		if (!container) return;
		var guildid = this.CurrentGuildStore.getGuildId();
		if (guildid) {
			var info = BDFDB.getKeyInformation({"node":container,"key":"user"});
			if (info) {
				if (!this.loadedusers[guildid]) this.loadedusers[guildid] = {};
				let timestamp, addTimestamp = (timestamp) => {
					var joinedAtDate = $(this.joinedAtDateMarkup);
					var choice = BDFDB.getData("joinedAtDateLang", this, "choices");
					joinedAtDate.text(this.labels.joinedat_text + " " + this.getJoinedTime(this.languages[choice].id, timestamp));
					var nametag = container.querySelector(BDFDB.dotCN.nametag);
					var creationDate = container.querySelector(".creationDate");
					container.insertBefore(joinedAtDate[0], creationDate ? creationDate : (nametag ? nametag.nextSibling : null));
					if (popout && popout.style.transform.indexOf("translateY(-1") == -1) {
						var arect = document.querySelector(BDFDB.dotCN.appmount).getBoundingClientRect();
						var prect = popout.getBoundingClientRect();
						popout.style.setProperty("top", (prect.y + prect.height > arect.height ? (arect.height - prect.height) : prect.y) + "px");
					}
				};
				if (this.loadedusers[guildid][info.id]) addTimestamp(this.loadedusers[guildid][info.id]);
				else this.APIModule.get(this.DiscordConstants.Endpoints.GUILD_MEMBER(guildid,info.id)).then(result => {
					if (result && result.body) {
						timestamp = new Date(result.body.joined_at);
						this.loadedusers[guildid][info.id] = timestamp;
						addTimestamp(timestamp);
					}
				});
			}
		}
	}
	
	getJoinedTime (languageid, timestamp = new Date()) {
		var settings = BDFDB.getAllData(this, "settings");
		var timestring = settings.addJoinedAtTime ? timestamp.toLocaleString(languageid) : timestamp.toLocaleDateString(languageid);
		if (timestring && settings.forceZeros) timestring = this.addLeadingZeros(timestring);
		return timestring;
	}
	
	addLeadingZeros (timestring) {
		var chararray = timestring.split("");
		var numreg = /[0-9]/;
		for (var i = 0; i < chararray.length; i++) {
			if (!numreg.test(chararray[i-1]) && numreg.test(chararray[i]) && !numreg.test(chararray[i+1])) chararray[i] = "0" + chararray[i];
		}
		
		return chararray.join("");
	}
	
	setLabelsByLanguage () {
		switch (BDFDB.getDiscordLanguage().id) {
			case "hr":		//croatian
				return {
					joinedat_text:				"Pridružio"
				};
			case "da":		//danish
				return {
					joinedat_text:				"Tilmeldt den"
				};
			case "de":		//german
				return {
					joinedat_text:				"Beigetreten am"
				};
			case "es":		//spanish
				return {
					joinedat_text:				"Unido el"
				};
			case "fr":		//french
				return {
					joinedat_text:				"Inscrit le"
				};
			case "it":		//italian
				return {
					joinedat_text:				"Iscritto il"
				};
			case "nl":		//dutch
				return {
					joinedat_text:				"Aangesloten op"
				};
			case "no":		//norwegian
				return {
					joinedat_text:				"Ble med på"
				};
			case "pl":		//polish
				return {
					joinedat_text:				"Dołączył"
				};
			case "pt-BR":	//portuguese (brazil)
				return {
					joinedat_text:				"Inscreveu-se em"
				};
			case "fi":		//finnish
				return {
					joinedat_text:				"Liittynyt"
				};
			case "sv":		//swedish
				return {
					joinedat_text:				"Anlände den"
				};
			case "tr":		//turkish
				return {
					joinedat_text:				"Katıldı"
				};
			case "cs":		//czech
				return {
					joinedat_text:				"Přihlásil dne"
				};
			case "bg":		//bulgarian
				return {
					joinedat_text:				"Се присъедини на"
				};
			case "ru":		//russian
				return {
					joinedat_text:				"Присоединился"
				};
			case "uk":		//ukrainian
				return {
					joinedat_text:				"Приєднався"
				};
			case "ja":		//japanese
				return {
					joinedat_text:				"に参加しました"
				};
			case "zh-TW":	//chinese (traditional)
				return {
					joinedat_text:				"加入了"
				};
			case "ko":		//korean
				return {
					joinedat_text:				"에 가입"
				};
			default:		//default: english
				return {
					joinedat_text:				"Joined on"
				};
		}
	}
}
