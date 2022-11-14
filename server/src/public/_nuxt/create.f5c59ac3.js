import{a as v,b,r as i,e as l,f as e,u as t,t as g,h as y,w as x,i as u,v as m,j as _,o as r,k as w}from"./entry.02760955.js";const k={class:"container"},S={class:"row"},D={class:"col-12"},B=e("h1",{class:"mt-5 display-1 textcenter"},"Add object",-1),I={key:0,class:"alert alert-danger mt-5 text-start",role:"alert"},V=["onSubmit"],j={class:"form-floating mb-3"},C=e("label",{for:"nameInput"},"Name",-1),M={class:"form-floating mb-3"},N=e("label",{for:"descriptionInput"},"Description",-1),R={class:"d-grid"},T={type:"submit",class:"btn btn-primary"},U={key:0,class:"spinner-border text-light",role:"status",style:{width:"1rem",height:"1rem"}},q=e("span",{class:"visually-hidden"},"Loading...",-1),A=[q],L={key:1},E=v({__name:"create",setup($){const p=b(),s=i(""),o=i(""),c=i(!1),a=i(null),h=async()=>{try{a.value=null,c.value=!0,await $fetch("/api/create",{method:"POST",body:{name:s.value,description:o.value},headers:{authorization:`Bearer ${localStorage.getItem("access_token")}`},baseURL:p.public.apiBase}),await w("/")}catch{a.value="Something went wrong."}finally{c.value=!1}};return(f,n)=>(r(),l("div",k,[e("div",S,[e("div",D,[B,t(a)?(r(),l("div",I,g(t(a)),1)):y("",!0),e("form",{onSubmit:x(h,["prevent"]),class:"mt-5"},[e("div",j,[u(e("input",{type:"text",class:"form-control",id:"nameInput",placeholder:"name@example.com",required:"","onUpdate:modelValue":n[0]||(n[0]=d=>_(s)?s.value=d:null)},null,512),[[m,t(s)]]),C]),e("div",M,[u(e("textarea",{class:"form-control",placeholder:"Describe the object",id:"descriptionInput",style:{height:"128px"},required:"","onUpdate:modelValue":n[1]||(n[1]=d=>_(o)?o.value=d:null)},null,512),[[m,t(o)]]),N]),e("div",R,[e("button",T,[t(c)?(r(),l("div",U,A)):(r(),l("span",L,"ADD"))])])],40,V)])])]))}});export{E as default};
