import{b as n,I as h,d as y,q as L,x as P,o as x,h as k,f as V,w as s,p as S,r as l,u as f,a as d,_ as C}from"./index-Ci-UkiOv.js";import{a as M}from"./authApi-jDQ8Javc.js";import{U as R}from"./UserOutlined-CVMzLpwd.js";var j={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M832 464h-68V240c0-70.7-57.3-128-128-128H388c-70.7 0-128 57.3-128 128v224h-68c-17.7 0-32 14.3-32 32v384c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V496c0-17.7-14.3-32-32-32zM332 240c0-30.9 25.1-56 56-56h248c30.9 0 56 25.1 56 56v224H332V240zm460 600H232V536h560v304zM484 701v53c0 4.4 3.6 8 8 8h40c4.4 0 8-3.6 8-8v-53a48.01 48.01 0 10-56 0z"}}]},name:"lock",theme:"outlined"};function _(a){for(var e=1;e<arguments.length;e++){var o=arguments[e]!=null?Object(arguments[e]):{},r=Object.keys(o);typeof Object.getOwnPropertySymbols=="function"&&(r=r.concat(Object.getOwnPropertySymbols(o).filter(function(i){return Object.getOwnPropertyDescriptor(o,i).enumerable}))),r.forEach(function(i){z(a,i,o[i])})}return a}function z(a,e,o){return e in a?Object.defineProperty(a,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):a[e]=o,a}var m=function(e,o){var r=_({},e,o.attrs);return n(h,_({},r,{icon:j}),null)};m.displayName="LockOutlined";m.inheritAttrs=!1;const B={class:"container"},F={class:"auth-page"},N=y({__name:"LoginPage",setup(a){const e=L({login:"",password:""}),o=async u=>{try{const t=await M(u);t&&(console.log(`Login 1st: ${t}`),S.push("/CRM-System/app/todo"))}catch{console.error("Ошибка авторизации")}},r=u=>{console.log("Failed:",u)},i=P(()=>!(e.login&&e.password));return(u,t)=>{const g=l("a-input"),c=l("a-form-item"),v=l("a-input-password"),b=l("a-button"),w=l("RouterLink"),O=l("a-form");return x(),k("div",B,[V("div",F,[n(O,{model:e,name:"normal_login",class:"login-form",onFinish:o,onFinishFailed:r},{default:s(()=>[n(c,{label:"Login",name:"login",rules:[{required:!0,message:"Please input your Login!"}]},{default:s(()=>[n(g,{value:e.login,"onUpdate:value":t[0]||(t[0]=p=>e.login=p)},{prefix:s(()=>[n(f(R),{class:"site-form-item-icon"})]),_:1},8,["value"])]),_:1}),n(c,{label:"Password",name:"password",rules:[{required:!0,message:"Please input your password!"}]},{default:s(()=>[n(v,{value:e.password,"onUpdate:value":t[1]||(t[1]=p=>e.password=p)},{prefix:s(()=>[n(f(m),{class:"site-form-item-icon"})]),_:1},8,["value"])]),_:1}),n(c,null,{default:s(()=>[n(b,{disabled:i.value,type:"primary","html-type":"submit",class:"login-form-button"},{default:s(()=>t[2]||(t[2]=[d(" Log in ")])),_:1},8,["disabled"]),t[4]||(t[4]=d(" Or ")),n(w,{to:"/CRM-System/auth/sign-up"},{default:s(()=>t[3]||(t[3]=[d("Register now!")])),_:1})]),_:1})]),_:1},8,["model"])])])}}}),I=C(N,[["__scopeId","data-v-e2354fce"]]);export{I as default};