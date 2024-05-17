"use strict";var Watermark=(()=>{var g=Object.defineProperty;var C=Object.getOwnPropertyDescriptor;var P=Object.getOwnPropertyNames;var y=Object.prototype.hasOwnProperty;var x=(r,e,t)=>e in r?g(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t;var M=(r,e)=>{for(var t in e)g(r,t,{get:e[t],enumerable:!0})},f=(r,e,t,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of P(e))!y.call(r,a)&&a!==t&&g(r,a,{get:()=>e[a],enumerable:!(i=C(e,a))||i.enumerable});return r};var L=r=>f(g({},"__esModule",{value:!0}),r);var d=(r,e,t)=>(x(r,typeof e!="symbol"?e+"":e,t),t);var V={};M(V,{Watermark:()=>A,default:()=>k});function D(r){return{name:"WatermarkOptions",type:"object",required:!0,allowEmpty:!1,properties:{imageUrl:{required:!0,type:"string"},x:{required:!1,type:"number"},y:{required:!1,type:"number"},size:{required:!1,type:["string","object","number"]}},validate(e,t,i,a){var T;let{RtcError:o,ErrorCode:l,ErrorCodeDictionary:s}=r.errorModule;if(!e)return;let{imageUrl:m}=e,p=m.split("?")[0].split(".").pop();if((p==="jpg"||p==="jpeg")&&r.log.warn("The image format is not recommended to be jpg/jpeg, because the format does not support transparency."),!((T=r.room.videoManager.cameraTrack)!=null&&T.mediaTrack))throw new o({code:l.INVALID_OPERATION,extraCode:s.INVALID_OPERATION_NEED_VIDEO,fnName:i});if(r.utils.isString(e.size)&&e.size!=="contain"&&e.size!=="cover")throw new o({code:l.INVALID_PARAMETER,extraCode:s.INVALID_PARAMETER_TYPE,message:"The size parameter must be 'contain' or 'cover'",fnName:i});if(r.utils.isNumber(e.size)&&(e.size<=0||e.size>1))throw new o({code:l.INVALID_PARAMETER,extraCode:s.INVALID_PARAMETER_RANGE,message:"The size parameter must be greater than 0",fnName:i});if(r.utils.isObject(e.size)){if(!e.size.width||!e.size.height)throw new o({code:l.INVALID_PARAMETER,extraCode:s.INVALID_PARAMETER_TYPE,message:"The size parameter must be an object with width and height properties",fnName:i});if(e.size.width<=0||e.size.height<=0)throw new o({code:l.INVALID_PARAMETER,extraCode:s.INVALID_PARAMETER_RANGE,message:"The size parameter must be greater than 0",fnName:i})}}}}function I(r){return{name:"StopWatermarkOptions",required:!1}}var E=0,_=class _{constructor(e){this.core=e;d(this,"seq");d(this,"_core");d(this,"log");d(this,"startResolve");d(this,"startReject");E=E+1,this.seq=E,this._core=e,this.log=e.log.createChild({id:`${this.getAlias()}${E}`}),this.log.info("created")}getName(){return _.Name}getAlias(){return"w"}getValidateRule(e){switch(e){case"start":return D(this._core);case"update":return I(this._core);case"stop":return I(this._core)}}getGroup(){return"w"}async start(e){return this.doStart(e)}async update(e){return await this.stop(),this.doStart(e)}async stop(){return this._core.room.videoManager.deleteWatermark()}async doStart(e){let{imageUrl:t,x:i=0,y:a=0,size:o="cover"}=e,{settings:l}=this._core.room.videoManager.cameraTrack,s;try{s=await this._core.utils.loadImage(t)}catch(B){let{RtcError:U,ErrorCode:h}=this.core.errorModule;throw new U({code:h.INVALID_PARAMETER,message:`load image failed, url: ${t}`})}let{width:m,height:c}=l,{width:p,height:T}=s,n=p,u=T;this._core.utils.isObject(o)&&(n=(o==null?void 0:o.width)||n,u=(o==null?void 0:o.height)||u),this._core.utils.isNumber(o)&&(n=p*o,u=T*o);let b=p/T,N=m/c,O=b>N;o==="contain"&&(O?(n=m,u=m/b):(n=c*b,u=c)),o==="cover"&&(O?(u=c,n=c*b):(n=m,u=m/b));let S=document.createElement("canvas"),R=S.getContext("2d");return S.width=Math.min(m-i,n),S.height=Math.min(c-a,u),R==null||R.drawImage(s,0,0,n,u),this._core.room.videoManager.setWatermark({x:i,y:a,imageUrl:S.toDataURL("image/png")})}};d(_,"Name","Watermark");var A=_;var k=A;return L(V);})().default;
