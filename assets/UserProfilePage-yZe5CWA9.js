import{d as p,m as _,r as m,p as f,o as h,a as b,c as a,w as t,e as v,b as i,h as s,t as n}from"./index-BiMnbbn5.js";const g={class:"wrapper"},y=p({__name:"UserProfilePage",setup(N){const r=_(),e=m({id:0,username:"",email:"",date:"",isBlocked:!1,isAdmin:!1,phoneNumber:""}),c=async()=>{const l=await r.fetchProfile();console.log(l),e.value=l},u=async()=>{await r.logout()};return f(async()=>{c()}),(l,w)=>{const o=i("a-descriptions-item"),d=i("a-descriptions");return h(),b("div",g,[a(d,{title:"Профиль"},{default:t(()=>[a(o,{label:"Имя:"},{default:t(()=>[s(n(e.value.username),1)]),_:1}),a(o,{label:"Мобильный номер"},{default:t(()=>[s(n(e.value.phoneNumber?e.value.phoneNumber:"Номер не привязан"),1)]),_:1}),a(o,{label:"E-mail:"},{default:t(()=>[s(n(e.value.email),1)]),_:1}),a(o,{label:"Роль"},{default:t(()=>[s(n(e.value.isAdmin?"Администратор":"Пользователь"),1)]),_:1}),a(o,{label:"Дата регистрации:"},{default:t(()=>[s(n(e.value.date),1)]),_:1})]),_:1}),v("button",{onClick:u,style:{padding:"10px",cursor:"pointer"}}," Logout ")])}}});export{y as default};
