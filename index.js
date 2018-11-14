/*
	User Avatars
	
	Using custom elements (only supported in cutting edge browsers like Chrome and Firefox)
	https://developer.mozilla.org/en-US/docs/Web/Web_Components/Using_custom_elements
	
	Examples:
	<user-avatar initials="KJ">
	<user-avatar initials="KJ" bgd="#E91E63">
	<user-avatar gravatar="6bd69795f929a40746cdf026a03b703e">
	<user-avatar url="http://avatar-url">
	
	@author Kevin Jantzer, Blackstone Publishing
*/

let BgdColors = ['#2196F3', '#f44336', '#673AB7', '#00BCD4', '#009688', '#4CAF50', '#FFC107', '#FF5722', '#795548', '#607D8B']

class UserAvatarElement extends HTMLElement {
	
	static get observedAttributes(){
		return ['initials', 'bgd', 'color', 'size', 'url', 'gravatar']	
	}
	
	static get bgdColors(){ return BgdColors }
	static set bgdColors(colors){return BgdColors = colors}
	
    constructor() {
        super()
		
		this.style.display = 'inline-block'
		this.style.verticalAlign = 'middle'
		this.style.lineHeight = '0'
        
        let shadow = this.attachShadow({mode: 'open'})
        let temp = document.createElement('template')
        let style = 'border-radius: 50%; vertical-align: center;'
        
        temp.innerHTML = `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" height="${this.size}" width="${this.size}" style="${style}">
            <rect x="0" y="0" width="120" height="120" rx="0" ry="0" fill="${this.bgd}"></rect>
            <text x="50%" y="50%" font-size="65" dominant-baseline="central" text-anchor="middle" fill="${this.color}">${this.initials}</text>
			<image xlink:href="" x="0" y="0" style="height: 100%; width: 100%;" onerror="this.style.display='none'">
        </svg>`
		
        this.shadowRoot.appendChild(temp.content.cloneNode(true));
    }
	
	attributeChangedCallback(name, oldVal, newVal){
		this[name] = newVal
	}
	
	getAttr(name, defaultVal){
		return this.hasAttribute(name) ? (this.getAttribute(name)||defaultVal) : defaultVal
	}
	
	get initials(){
		return this.getAttr('initials', '-')
	}
	
	set initials(str){
		this.shadowRoot.querySelector('text').innerHTML = str || '-'
		this.bgd = this.bgd // update bgd to match initial change (wont change if user specified the bgd attr)
	}
	
	get bgd(){
		let color = this.getAttr('bgd')
		if( !color ){
			let char = this.getAttr('initials', 'a').toLowerCase().charCodeAt(0) - 97
			color = BgdColors[ char % BgdColors.length ]
		}
		return color
	}
	
	set bgd(color){
		this.shadowRoot.querySelector('rect').setAttribute('fill', color||this.bgd)
	}
	
	get color(){
		return this.getAttr('color' ,'#fff')
	}
	
	set color(color){
		this.shadowRoot.querySelector('text').setAttribute('fill', color||this.color)
	}
	
	get size(){
		return this.getAttr('size', 24)
	}
	
	set size(size){
		let svg = this.shadowRoot.firstElementChild
		svg.setAttribute('height', size)
		svg.setAttribute('width', size)
	}
	
	set url(url){
		let img = this.shadowRoot.querySelector('image')
		img.setAttribute('xlink:href', url)
		img.style.display = ''
	}
	
	set gravatar(guid){
		this.url = `http://gravatar.com/avatar/${guid}?d=404&s=72`
	}
}

customElements.define('user-avatar', UserAvatarElement)
