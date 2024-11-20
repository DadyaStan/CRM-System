import{s as w}from"./authApi-jDQ8Javc.js";import{d as U,e as c,q,o as d,h as v,f as p,b as s,w as t,c as C,s as S,r as i,a as _,_ as j}from"./index-Ci-UkiOv.js";const F={class:"auth-page"},$={key:0,class:"auth-page__success-box"},B=U({__name:"SignUpPage",setup(N){const m=c(),a=q({username:"",login:"",pass:"",checkPass:"",email:"",phone:""}),g=c(!1),b=async o=>{console.log(o,a),console.log("handle");const e={login:a.login,username:a.username,password:a.pass,email:a.email,phoneNumber:a.phone};try{await w(e),g.value=!0}catch(n){n instanceof Error&&n.message==="409"?alert("Такой логин или почта уже существует"):alert(`Ошибка при создании профиля: ${n}`)}},h=async(o,e)=>e===""?Promise.reject("Введите пароль"):e.length<6?Promise.reject("Пароль должен иметь больше 6 символов"):(a.checkPass!==""&&(m==null||m.value.validateFields("checkPass")),Promise.resolve()),k=async(o,e)=>e===""?Promise.reject("Введите снова пароль"):e.length<6?Promise.reject("Пароль должен иметь больше 6 символов"):e!==a.pass?Promise.reject("Пароль не совпадает"):Promise.resolve(""),P={labelCol:{span:11},wrapperCol:{span:18}},y=o=>{console.log(o)};return(o,e)=>{const n=i("router-link"),u=i("a-input"),r=i("a-form-item"),f=i("a-button"),x=i("a-form");return d(),v("div",F,[g.value?(d(),v("div",$,[e[7]||(e[7]=p("h3",null,"Регистрация прошла успешно!",-1)),s(n,{to:"/CRM-System/auth/login"},{default:t(()=>e[6]||(e[6]=[_(" Вернутся на страницу входа ")])),_:1})])):(d(),C(x,S({key:1,ref_key:"formRef",ref:m,name:"custom-validation",model:a},P,{onFinish:b,onFinishFailed:y}),{default:t(()=>[s(r,{"has-feedback":"",label:"Имя пользователя",name:"username",rules:[{required:!0,min:1,message:"Введите имя пользователя",trigger:"blur"},{max:60,message:"Введите меньше 60 символов",trigger:"change"},{pattern:/^[a-zA-Zа-яА-ЯёЁ0-9]{1,60}$/,trigger:"change",message:"Символы русского/латинского алфавита!"}]},{default:t(()=>[s(u,{value:a.username,"onUpdate:value":e[0]||(e[0]=l=>a.username=l),autocomplete:"off"},null,8,["value"])]),_:1}),s(r,{"has-feedback":"",label:"Логин",name:"login",rules:[{required:!0,message:"Введите логин",trigger:"blur"},{min:2,message:"Введите больше 1 символа",trigger:"blur"},{max:60,message:"Введите меньше 60 символов",trigger:"blur"},{pattern:/^[a-zA-Z]{2,60}$/,trigger:"blur",message:"Символы латинского алфавита!"}]},{default:t(()=>[s(u,{value:a.login,"onUpdate:value":e[1]||(e[1]=l=>a.login=l),autocomplete:"off"},null,8,["value"])]),_:1}),s(r,{"has-feedback":"",label:"Пароль",name:"pass",rules:[{required:!0,min:6,validator:h,trigger:"blur"}]},{default:t(()=>[s(u,{value:a.pass,"onUpdate:value":e[2]||(e[2]=l=>a.pass=l),type:"password",autocomplete:"off"},null,8,["value"])]),_:1},8,["rules"]),s(r,{"has-feedback":"",name:"checkPass",label:"Подтвердите",rules:[{required:!0,validator:k,trigger:"change"}]},{default:t(()=>[s(u,{value:a.checkPass,"onUpdate:value":e[3]||(e[3]=l=>a.checkPass=l),type:"password",autocomplete:"off"},null,8,["value"])]),_:1},8,["rules"]),s(r,{"has-feedback":"",label:"Почта",name:"email",rules:[{required:!0,pattern:/^[^\s@]+@[^\s@]+\.[^\s@]+$/,trigger:"change",message:"Введите реальную почту"}]},{default:t(()=>[s(u,{value:a.email,"onUpdate:value":e[4]||(e[4]=l=>a.email=l),autocomplete:"off"},null,8,["value"])]),_:1}),s(r,{"has-feedback":"",label:"Phone",name:"phone",rules:[{required:!1,message:"Введите корректный номер телефона",trigger:"change",pattern:/^\+?[0-9\s\-()]{7,15}$/}]},{default:t(()=>[s(u,{value:a.phone,"onUpdate:value":e[5]||(e[5]=l=>a.phone=l)},null,8,["value"])]),_:1}),s(r,{class:"auth-page__btn-box"},{default:t(()=>[p("div",null,[p("div",null,[s(f,{type:"primary","html-type":"submit"},{default:t(()=>e[8]||(e[8]=[_(" Создать аккаунт ")])),_:1})]),s(f,{style:{margin:"20px auto"}},{default:t(()=>[s(n,{to:"/CRM-System/auth/login"},{default:t(()=>e[9]||(e[9]=[p("p",null,"Вернуться ко входу",-1)])),_:1})]),_:1})])]),_:1})]),_:1},16,["model"]))])}}}),z=j(B,[["__scopeId","data-v-c9d70d64"]]);export{z as default};
