import{d as B,m as O,b as r,p as S,o as i,c as w,f as t,g as o,k as a,e as n,u,U as K,h as g,t as y}from"./index-CWzzzMiU.js";import{U as M,M as D,a as N}from"./UnorderedListOutlined-JOgoP_oa.js";const V={class:"wrapper"},E=B({__name:"UserProfileView",setup(L){const v=O(),p=r(["2"]),l=r(!1),s=r({});S(()=>{const _=localStorage.getItem("userData");s.value=JSON.parse(_),console.log(s.value)});const k=async()=>{await v.logout()};return(_,e)=>{const c=a("a-menu-item"),f=a("router-link"),U=a("a-menu"),x=a("a-layout-sider"),C=a("a-layout-header"),b=a("a-layout-content"),m=a("a-layout");return i(),w("div",V,[t(m,null,{default:o(()=>[t(x,{collapsed:l.value,"onUpdate:collapsed":e[1]||(e[1]=d=>l.value=d),trigger:null,collapsible:""},{default:o(()=>[e[6]||(e[6]=n("div",{class:"logo"},null,-1)),t(U,{selectedKeys:p.value,"onUpdate:selectedKeys":e[0]||(e[0]=d=>p.value=d),theme:"dark",mode:"inline"},{default:o(()=>[t(f,{to:"/todo-list/todo"},{default:o(()=>[t(c,{key:"1"},{default:o(()=>[t(u(M)),e[4]||(e[4]=n("span",null,"Todo",-1))]),_:1})]),_:1}),t(f,{to:"/todo-list/profile"},{default:o(()=>[t(c,{key:"2"},{default:o(()=>[t(u(K)),e[5]||(e[5]=n("span",null,"Profile",-1))]),_:1})]),_:1})]),_:1},8,["selectedKeys"])]),_:1},8,["collapsed"]),t(m,null,{default:o(()=>[t(C,{style:{background:"#fff",padding:"0"}},{default:o(()=>[l.value?(i(),g(u(D),{key:0,class:"trigger",onClick:e[2]||(e[2]=()=>l.value=!l.value)})):(i(),g(u(N),{key:1,class:"trigger",onClick:e[3]||(e[3]=()=>l.value=!l.value)}))]),_:1}),t(b,{style:{margin:"24px 16px",padding:"24px",background:"#fff",minHeight:"100vh"}},{default:o(()=>[n("div",null," Твоё имя - "+y(s.value.username),1),n("div",null," Твоя почта - "+y(s.value.email),1),n("button",{onClick:k,style:{padding:"10px",cursor:"pointer"}}," Logout ")]),_:1})]),_:1})]),_:1})])}}});export{E as default};