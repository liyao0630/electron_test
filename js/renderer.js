const electron = require('electron');
const ipcRenderer = electron.ipcRenderer;

document.querySelector('#close').onclick=function(){
	ipcRenderer.send('window-close');
}
document.querySelector('#min').onclick=function(){
	ipcRenderer.send('window-min');
}

Array.from(document.querySelectorAll('a')).map( (ele,index)=>{
	let href = ele.href;
	ele.href = 'javascript:;'
	ele.onclick=function(){
		ipcRenderer.send('loadurl-message',href);
	}
})