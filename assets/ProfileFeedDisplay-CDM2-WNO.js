import{p as e,t as s,s as a,a as t,b as i,c as l,d as r,e as o,f as n,g as d,B as c,h as p,i as u,j as v,k as f,m,l as h,C as b}from"./index-D8UsJ2T2.js";import{X as y,s as k,a as $,h as g,o as w,n as x,G as j,b as Z,C as M,r as q,e as C}from"./GuideInstructions-Czp1-iBW.js";import{s as A}from"./index-Cr8Vao8y.js";const F=/[&"<]/g,_=/[&<]/g;function B(e,s){const a=String(e??""),t=s?F:_;t.lastIndex=0;let i="",l=0;for(;t.test(a);){const e=t.lastIndex-1,s=a[e];i+=a.substring(l,e)+("&"===s?"&amp;":'"'===s?"&quot;":"&lt;"),l=e+1}return i+a.substring(l)}function N(e,s,a=!1){if(null==s||!s&&a||""===s&&"class"===e)return"";return` ${e}${a?"":`="${B(s,!0)}"`}`}function z(e){return"string"==typeof e?e:null==e?"":e+""}const U="!no-unauthenticated";function P(e,s){const{children:a}=s;e.out+='<div class="bluesky-embed s-1pz15a1">',a(e),e.out+="</div>"}const I=e=>`https://bsky.app/profile/${e}`,R=(e,s)=>`https://bsky.app/profile/${e}/post/${s}`,T=(e,s)=>`https://bsky.app/profile/${e}/feed/${s}`;let S=0,H=0;const V=new Intl.DateTimeFormat("en-US",{dateStyle:"long",timeStyle:"short"}),L=new Intl.DateTimeFormat("en-US",{dateStyle:"medium"}),D=new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}),G=e=>{const s=new Date(e),a=s.getTime();if(isNaN(a))return"N/A";const t=Date.now();if(t>H){const e=new Date(t);e.setMonth(0,1),e.setHours(0,0,0),S=e.getTime(),e.setFullYear(e.getFullYear()+1,0,0),e.setHours(23,59,59,999),H=e.getTime()}return a>=S&&a<=H?D.format(s):L.format(s)},W=/^at:\/\/((?:did:[a-zA-Z0-9._:%-]+)|(?:[a-zA-Z0-9][a-zA-Z0-9-.]*))(?:\/([a-zA-Z0-9.-]+)(?:\/([a-zA-Z0-9_~.:-]{1,512}))?)?\/?(?:\?([^#\s]*))?(?:#([^\s]*))?$/,Y=e=>{const s=W.exec(e);if(!s)throw new E(`invalid at-uri: ${e}`);return{repo:s[1],collection:s[2]??"",rkey:s[3]??"",query:s[4]??"",fragment:s[5]??""}};class E extends Error{}const X=new Intl.NumberFormat("en-US"),J=new Intl.NumberFormat("en-US",{notation:"compact"}),K=e=>e<1e3?""+e:e<1e5?X.format(e):J.format(e),O=e=>X.format(e),Q={"!hide":{name:"Hidden by moderators",flags:1},"!warn":{name:"Content warning",flags:1},porn:{name:"Adult content",flags:0},sexual:{name:"Sexually suggestive",flags:0},"graphic-media":{name:"Graphic media",flags:0},nudity:{name:"Nudity",flags:0}},ee=(e,s)=>{if(e?.length)for(let a=0,t=e.length;a<t;a++){const t=e[a],i=t.val;if(!(i in Q))continue;const l=Q[i];if(!(1&l.flags&&t.src===s))return l}};function se(e,s){const{embed:a}=s,t=a.external,i=(e=>{let s;if("parse"in URL)s=URL.parse(e);else try{s=new URL(e)}catch{}return!s||"https:"!==s.protocol&&"http:"!==s.protocol?null:s})(t.uri)?.host;e.out+=`<a target="_blank"${N("href",i&&t.uri)} rel="noopener noreferrer nofollow" class="external-embed s-au8a8u">`,t.thumb&&(e.out+=`<img loading="lazy"${N("src",t.thumb)} alt="" class="thumbnail s-au8a8u">`),e.out+=` <div class="meta s-au8a8u"><p class="title s-au8a8u">${B(t.title)}</p> <p class="description s-au8a8u">${B(t.description)}</p> `,i&&(e.out+=`<div class="domain s-au8a8u"><svg class="icon" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="m4.172 8.07 3.94 2.957.977-1.941 3.887-.978 1.15-4.6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-6.078 4.865.973-1.946-2.869-1.928-1.89-.12-1.08 1.075 1.947 2.919h2.919Z"></path></svg> <span class="domain-name">${B(i)}</span></div>`),e.out+="</div></a>"}const ae={width:16,height:9};function te(e,s){const{embed:a,borderless:t,standalone:i,blur:l}=s,r=a.images,o=r.length;function n(e,s){const a=r[s];e.out+=`<img loading="lazy"${N("src",a.thumb)}${N("alt",a.alt)}${N("class",`${z("image"+(l?" is-blurred":""))} s-1d339cy`)}>`}if(e.out+=`<div${N("class",`${z("image-embed"+(t?"":" is-bordered")+(i&&1===o?" is-aligned":""))} s-1d339cy`)}>`,4===o)e.out+='<div class="grid s-1d339cy"><div class="col s-1d339cy"><div class="item wide tl s-1d339cy">',n(e,0),e.out+='</div> <div class="item wide bl s-1d339cy">',n(e,2),e.out+='</div></div> <div class="col s-1d339cy"><div class="item wide tr s-1d339cy">',n(e,1),e.out+='</div> <div class="item wide br s-1d339cy">',n(e,3),e.out+="</div></div></div>";else if(3===o)e.out+='<div class="grid s-1d339cy"><div class="col square s-1d339cy"><div class="item tl bl s-1d339cy">',n(e,0),e.out+='</div></div> <div class="col square s-1d339cy"><div class="item tr s-1d339cy">',n(e,1),e.out+='</div> <div class="item br s-1d339cy">',n(e,2),e.out+="</div></div></div>";else if(2===o)e.out+='<div class="grid s-1d339cy"><div class="col s-1d339cy"><div class="item square tl bl s-1d339cy">',n(e,0),e.out+='</div></div> <div class="col s-1d339cy"><div class="item square tr br s-1d339cy">',n(e,1),e.out+="</div></div></div>";else if(1===o){const s=i&&(r[0].aspectRatio||ae);e.out+=`<div${N("class",`${z("single-item tl tr bl br"+(s?" is-standalone":""))} s-1d339cy`)}${N("style",s?`aspect-ratio: ${s.width}/${s.height}`:"")}>`,n(e,0),e.out+=" ",s&&(e.out+='<div class="placeholder s-1d339cy"></div>'),e.out+="</div>"}e.out+="</div>"}function ie(e,s){const{post:a,embed:t,borderless:i,standalone:l,blur:r}=s,o=l&&t.aspectRatio,n=a&&R(a.author.did,Y(a.uri).rkey);function d(e){e.out+=`<img loading="lazy"${N("src",t.thumbnail)} alt=""${N("class",`${z("thumbnail"+(r?" is-blurred":""))} s-1h3cnsw`)}> `,o&&(e.out+='<div class="placeholder s-1h3cnsw"></div>'),e.out+=' <div class="play s-1h3cnsw"><svg class="icon s-1h3cnsw" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M22 12 5 2v20l17-10Z"></path></svg></div>'}l?(e.out+=`<a target="_blank"${N("href",n)}${N("class",`${z("video-embed"+(i?"":" is-bordered")+(l?" is-standalone":""))} s-1h3cnsw`)}><div class="constrainer s-1h3cnsw"${N("style",o?`aspect-ratio: ${o.width}/${o.height}`:"")}>`,d(e),e.out+="</div></a>"):(e.out+=`<div${N("class",`${z("video-embed"+(i?"":" is-bordered"))} s-1h3cnsw`)}${N("style",o?`aspect-ratio: ${o.width}/${o.height}`:"")}>`,d(e),e.out+="</div>")}const le=e=>{if(e){if("app.bsky.embed.images#view"===e.$type)return e;if("app.bsky.embed.recordWithMedia#view"===e.$type)return le(e.media)}},re=e=>{if(e){if("app.bsky.embed.video#view"===e.$type)return e;if("app.bsky.embed.recordWithMedia#view"===e.$type)return re(e.media)}};function oe(e,s){e.out+=`<div class="message s-1nks9gp">${B(s)}</div>`}function ne(e,s){const{post:a,embed:t,large:i=!1}=s;function l(e,s){!function(e,s){const{warning:a,children:t}=s;a?(e.out+=`<details class="content-hider s-1se5tqk"><summary class="gate s-1se5tqk"><svg class="icon s-1se5tqk" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="square" stroke-width="2" d="M11 11h1v5m9-4a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"></path><path fill="currentColor" stroke="currentColor" stroke-width=".5" d="M11.5 7.25h-.25v1.5h1.5v-1.5H11.5Z"></path></svg> <span class="label s-1se5tqk">${B(a.name)}</span> <span class="action s-1se5tqk"></span></summary> `,t(e),e.out+="</details>"):t(e)}(e,{warning:a&&ee(a.labels,a.author.did),children:e=>{"app.bsky.embed.external#view"===s.$type?se(e,{embed:s}):"app.bsky.embed.images#view"===s.$type?te(e,{embed:s,standalone:!0}):"app.bsky.embed.video#view"===s.$type?ie(e,{post:a,embed:s,standalone:!0}):oe(e,"Unsupported media embed")}})}function r(e,s){const a=s.record;if("app.bsky.embed.record#viewRecord"===a.$type)!function(e,s){const{embed:a,large:t=!1}=s,i=a.value,l=i.text.trim(),r=a.author,o=r.displayName?.trim(),n=a.embeds?.[0],d=le(n),c=re(n),p=R(r.did,Y(a.uri).rkey),u=!!ee(a.labels,r.did);e.out+=`<a target="_blank"${N("href",p)} class="quote-embed s-vbjlyj"><div class="meta s-vbjlyj"><div class="avatar-wrapper s-vbjlyj">`,r.avatar&&(e.out+=`<img loading="lazy"${N("src",r.avatar)} alt="" class="avatar s-vbjlyj">`),e.out+='</div> <span class="name-wrapper s-vbjlyj">',o&&(e.out+=`<bdi class="display-name-wrapper s-vbjlyj"><span class="display-name s-vbjlyj">${B(o)}</span></bdi>`),e.out+=` <span class="handle s-vbjlyj">@${B(r.handle)}</span></span> <span aria-hidden="true" class="dot s-vbjlyj">·</span> <time${N("datetime",i.createdAt)} class="date s-vbjlyj">${B(G(i.createdAt))}</time></div> `,l?(e.out+='<div class="body s-vbjlyj">',t||(d?(e.out+='<div class="aside s-vbjlyj">',te(e,{embed:d,blur:u}),e.out+="</div>"):c&&(e.out+='<div class="aside s-vbjlyj">',ie(e,{embed:c,blur:u}),e.out+="</div>")),e.out+=` <p class="text s-vbjlyj">${B(l)}</p></div>`):e.out+='<div class="divide s-vbjlyj"></div>',e.out+=" ",!t&&l||(d?te(e,{embed:d,borderless:!0,blur:u}):c&&ie(e,{embed:c,borderless:!0,blur:u})),e.out+="</a>"}(e,{embed:a,large:i});else if("app.bsky.feed.defs#generatorView"===a.$type)!function(e,s){const{embed:a}=s,t=a.creator,i=T(t.did,Y(a.uri).rkey);e.out+=`<a target="_blank"${N("href",i)} class="feed-embed s-1c1phtf"><div class="main s-1c1phtf"><div class="avatar-wrapper s-1c1phtf">`,a.avatar?e.out+=`<img loading="lazy"${N("src",a.avatar)} alt="" class="avatar s-1c1phtf">`:e.out+='<svg viewBox="0 0 32 32" class="avatar s-1c1phtf"><path fill="#0070FF" d="M0 0h32v32H0z"></path><path fill="#fff" d="M22.153 22.354a9.328 9.328 0 0 0 3.837-.491 3.076 3.076 0 0 0-4.802-2.79m.965 3.281a6.128 6.128 0 0 0-.965-3.28Zm-11.342-3.28a3.077 3.077 0 0 0-4.801 2.79 9.21 9.21 0 0 0 3.835.49m.966-3.28a6.127 6.127 0 0 0-.966 3.28Zm8.265-8.997a3.076 3.076 0 1 1-6.153 0 3.076 3.076 0 0 1 6.153 0Zm6.154 3.077a2.307 2.307 0 1 1-4.615 0 2.307 2.307 0 0 1 4.615 0Zm-13.847 0a2.307 2.307 0 1 1-4.614 0 2.307 2.307 0 0 1 4.614 0Z"></path><path fill="#fff" d="M22 22c0 3.314-2.686 3.5-6 3.5s-6-.186-6-3.5a6 6 0 0 1 12 0Z"></path></svg>',e.out+=`</div> <div class="info"><p class="name s-1c1phtf">${B(a.displayName)}</p> <p class="creator s-1c1phtf">Feed by @${B(t.handle)}</p></div></div> <p class="description s-1c1phtf">${B(a.description)}</p></a>`}(e,{embed:a});else if("app.bsky.graph.defs#listView"===a.$type)!function(e,s){const{embed:a}=s,t=a.creator,i=T(t.did,Y(a.uri).rkey);e.out+=`<a target="_blank"${N("href",i)} class="list-embed s-1mo1e33"><div class="main s-1mo1e33"><div class="avatar-wrapper s-1mo1e33">`,a.avatar?e.out+=`<img loading="lazy"${N("src",a.avatar)} alt="" class="avatar s-1mo1e33">`:e.out+='<svg viewBox="0 0 32 32" class="avatar s-1mo1e33"><path fill="#0070FF" d="M0 0h32v32H0z"></path><path fill="#fff" d="M22.153 22.354a9.328 9.328 0 0 0 3.837-.491 3.076 3.076 0 0 0-4.802-2.79m.965 3.281a6.128 6.128 0 0 0-.965-3.28Zm-11.342-3.28a3.077 3.077 0 0 0-4.801 2.79 9.21 9.21 0 0 0 3.835.49m.966-3.28a6.127 6.127 0 0 0-.966 3.28Zm8.265-8.997a3.076 3.076 0 1 1-6.153 0 3.076 3.076 0 0 1 6.153 0Zm6.154 3.077a2.307 2.307 0 1 1-4.615 0 2.307 2.307 0 0 1 4.615 0Zm-13.847 0a2.307 2.307 0 1 1-4.614 0 2.307 2.307 0 0 1 4.614 0Z"></path><path fill="#fff" d="M22 22c0 3.314-2.686 3.5-6 3.5s-6-.186-6-3.5a6 6 0 0 1 12 0Z"></path></svg>',e.out+=`</div> <div class="info"><p class="name s-1mo1e33">${B(a.name)}</p> <p class="creator s-1mo1e33">${B((e=>{switch(e){case"app.bsky.graph.defs#curatelist":return"User list";case"app.bsky.graph.defs#modlist":return"Moderation list"}return"Unknown list"})(a.purpose))} by @${B(t.handle)}</p></div></div> <p class="description s-1mo1e33">${B(a.description)}</p></a>`}(e,{embed:a});else if("app.bsky.graph.defs#starterPackViewBasic"===a.$type)!function(e,s){const{embed:a,large:t=!1}=s,i=a.record,l=a.creator,r=l.did,o=Y(a.uri).rkey,n=((e,s)=>`https://bsky.app/starter-pack/${e}/${s}`)(r,o);if(e.out+=`<a target="_blank"${N("href",n)} class="starterpack-embed s-whpa2l">`,t){const s=((e,s)=>`https://ogcard.cdn.bsky.app/start/${e}/${s}`)(r,o);e.out+=`<img loading="lazy"${N("src",s)} alt="" class="banner s-whpa2l">`}e.out+=` <div class="meta s-whpa2l"><div class="main s-whpa2l"><svg fill="none" viewBox="0 0 24 24" class="avatar s-whpa2l"><defs><linearGradient id="a" x1="0" x2="100%" y1="0" y2="0" gradientTransform="rotate(45)"><stop offset="0" stop-color="#0A7AFF"></stop><stop offset="1" stop-color="#59B9FF"></stop></linearGradient></defs><path fill="url(#a)" fill-rule="evenodd" d="M11.26 5.227 5.02 6.899c-.734.197-1.17.95-.973 1.685l1.672 6.24c.197.734.951 1.17 1.685.973l6.24-1.672a1.376 1.376 0 0 0 .973-1.685L12.945 6.2a1.375 1.375 0 0 0-1.685-.973Zm-6.566.459a2.632 2.632 0 0 0-1.86 3.223l1.672 6.24a2.632 2.632 0 0 0 3.223 1.861l6.24-1.672a2.631 2.631 0 0 0 1.861-3.223l-1.672-6.24a2.632 2.632 0 0 0-3.223-1.861l-6.24 1.672Z" clip-rule="evenodd"></path><path fill="url(#a)" fill-rule="evenodd" d="M15.138 18.411a4.606 4.606 0 1 0 0-9.211 4.606 4.606 0 0 0 0 9.211Zm0 1.257a5.862 5.862 0 1 0 0-11.724 5.862 5.862 0 0 0 0 11.724Z" clip-rule="evenodd"></path></svg> <div class="info"><p class="name s-whpa2l">${B(i.name)}</p> <p class="creator s-whpa2l">Starter pack by @${B(l.handle)}</p></div></div> <p class="description s-whpa2l">${B(i.description)}</p></div></a>`}(e,{embed:a,large:i});else{const s=(e=>{switch(e){case"app.bsky.feed.post":return"post";case"app.bsky.feed.generator":return"feed";case"app.bsky.graph.list":return"list";case"app.bsky.graph.starterpack":return"starter pack";case"app.bsky.labeler.service":return"labeler"}return null})(Y(a.uri).collection);oe(e,s&&("app.bsky.embed.record#viewNotFound"===a.$type||"app.bsky.embed.record#viewBlocked"===a.$type||"app.bsky.embed.record#viewDetached"===a.$type)?`This ${s} is unavailable`:"Unsupported record embed")}}e.out+='<div class="embeds s-1nks9gp">',"app.bsky.embed.recordWithMedia#view"===t.$type?(l(e,t.media),e.out+=" ",r(e,t.record)):"app.bsky.embed.record#view"===t.$type?r(e,t):l(e,t),e.out+="</div>"}function de(e,s){const{item:a,prev:t=!1,next:i=!1}=s,l=a.reason,r=a.post,o=a.reply?.parent,n=r.author,d=I(n.did),c=n.displayName?.trim(),p=r.record,u=R(n.did,Y(r.uri).rkey),v=r.replyCount||0,f=r.likeCount||0,m=(r.repostCount||0)+(r.quoteCount||0);if(e.out+=`<div${N("class",`${z("feed-post"+(i?"":" is-leaf"))} s-1c3lek9`)}><div class="contexts s-1c3lek9">`,t&&(e.out+='<div class="ascendant-line-wrapper s-1c3lek9"><div class="line s-1c3lek9"></div></div>'),e.out+=" ",l)if("app.bsky.feed.defs#reasonRepost"===l.$type){const s=l.by;e.out+=`<div class="context s-1c3lek9"><div class="aside s-1c3lek9"><svg class="icon" viewBox="0 0 24 24" fill="none"><path d="M17 3L20 6L17 9M7 21L4 18L7 15M5 18H20V13M4 11V6H19" stroke="currentColor" stroke-width="2" stroke-linecap="square"></path></svg></div> <a${N("href",I(s.did))} class="main s-1c3lek9"><span dir="auto" class="name s-1c3lek9">${B(s.displayName)}</span> <span class="affix s-1c3lek9"> reposted</span></a></div>`}else"app.bsky.feed.defs#reasonPin"===l.$type&&(e.out+='<div class="context s-1c3lek9"><div class="aside s-1c3lek9"><svg class="icon" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="square" stroke-width="2" d="M12 15H5v-2.5l.377-.377A7.25 7.25 0 0 0 7.5 6.997V3h9v3.997a7.25 7.25 0 0 0 2.123 5.127L19 12.5V15h-7Zm0 0v6"></path></svg></div> <span class="flex min-w-0">Pinned</span></div>');if(e.out+=`</div> <div class="content s-1c3lek9"><div class="aside s-1c3lek9"><a target="_blank"${N("href",d)} class="avatar-wrapper s-1c3lek9">`,n.avatar&&(e.out+=`<img loading="lazy"${N("src",n.avatar)} alt="" class="avatar s-1c3lek9">`),e.out+="</a> ",i&&(e.out+='<div class="descendant-line s-1c3lek9"></div>'),e.out+=`</div> <div class="main s-1c3lek9"><div class="meta s-1c3lek9"><a${N("href",d)} target="_blank" class="name-wrapper s-1c3lek9">`,c&&(e.out+=`<bdi class="display-name-wrapper s-1c3lek9"><span class="display-name s-1c3lek9">${B(c)}</span></bdi>`),e.out+=` <span class="handle s-1c3lek9">@${B(n.handle)}</span></a> <span aria-hidden="true" class="dot s-1c3lek9">·</span> <a target="_blank"${N("href",u)}${N("title",(e=>{const s=new Date(e);return isNaN(s.getTime())?"N/A":V.format(s)})(p.createdAt))} class="date s-1c3lek9"><time${N("datetime",p.createdAt)}>${B(G(p.createdAt))}</time></a></div> `,!t&&p.reply){if(e.out+='<p class="reply-context s-1c3lek9">',o&&"app.bsky.feed.defs#postView"===o.$type){const s=o.author;e.out+=`Replying to <a target="_blank"${N("href",I(s.did))} dir="auto" class="s-1c3lek9">${B(s.displayName?.trim()||`@${s.handle}`)}</a>`}else e.out+="Replying to an unknown post";e.out+="</p>"}e.out+=" ",function(e,s){const{text:a,facets:t,large:i}=s,l=A(a,t);e.out+=`<p${N("class",`${z("rich-text"+(i?" is-large":" is-small"))} s-10xqaeb`)}>`;for(let n=0,d=l.length;n<d;n++){let s=l[n];const a=(o=s.features,o?.find((e=>"app.bsky.richtext.facet#link"===e.$type||"app.bsky.richtext.facet#mention"===e.$type||"app.bsky.richtext.facet#tag"===e.$type)));a?"app.bsky.richtext.facet#link"===a.$type?e.out+=`<a target="_blank"${N("href",a.uri)} rel="noopener nofollow" class="link s-10xqaeb">${B(s.text)}</a>`:"app.bsky.richtext.facet#mention"===a.$type?e.out+=`<a target="_blank"${N("href",I(a.did))} class="mention s-10xqaeb">${B(s.text)}</a>`:"app.bsky.richtext.facet#tag"===a.$type&&(e.out+=`<a target="_blank"${N("href",(r=a.tag,`https://bsky.app/hashtag/${r}`))} class="hashtag s-10xqaeb">${B(s.text)}</a>`):e.out+=B(s.text)}var r,o;e.out+="</p>"}(e,{text:p.text,facets:p.facets}),e.out+=" ",r.embed&&ne(e,{post:r,embed:r.embed}),e.out+=` <div class="metrics s-1c3lek9"><div${N("title",1===v?`${O(v)} reply`:`${O(v)} replies`)} class="stat s-1c3lek9"><svg class="icon" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="square" stroke-width="2" d="M3.002 4h18v14h-9l-5 3v-3h-4V4Z"></path></svg> <span class="count s-1c3lek9">${B(K(v))}</span></div> <div${N("title",1===m?`${O(m)} repost`:`${O(m)} reposts`)} class="stat s-1c3lek9"><svg class="icon" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="square" stroke-width="2" d="m17 3 3 3-3 3M7 21l-3-3 3-3m-2 3h15v-5M4 11V6h15"></path></svg> <span class="count s-1c3lek9">${B(K(m))}</span></div> <div${N("title",1===f?`${O(f)} like`:`${O(f)} likes`)} class="stat s-1c3lek9"><svg class="icon" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-width="2" d="M12 5.768c6.162-6.25 16.725 5.358 0 14.732C-4.725 11.126 5.838-.482 12 5.768Z"></path></svg> <span class="count s-1c3lek9">${B(K(f))}</span></div></div></div></div></div>`}function ce(e,s){P(e,{children:e=>{e.out+=`<div class="message s-f12rvk">${B(s)}</div>`}})}function pe(e,s){const{profile:a,feed:t,allowUnauthenticated:i}=s,l=!i&&a?.labels?.some((e=>e.val===U)),r=t.filter((e=>{if(!a)return!1;const s=e.reason;if(s){if("app.bsky.feed.defs#reasonPin"===s.$type)return!0;if("app.bsky.feed.defs#reasonRepost"===s.$type){const s=e.post.author;return s.did===a.did||(i||!s.labels?.some((e=>e.val===U)))}return!1}return!e.reply}));null===a?ce(e,"The profile can't be found, it may have been deleted."):l?ce(e,"The user has requested for their posts to not be displayed on external sites."):P(e,{children:e=>{if(function(e,s){const{profile:a}=s;e.out+=`<div class="profile-feed-header s-1xh30xs"><a target="_blank"${N("href",I(a.did))} class="title s-1xh30xs">Posts from @${B(a.handle)}</a> <svg class="logo s-1xh30xs" fill="none" viewBox="0 0 320 286"><path fill="#0A7AFF" d="M69.364 19.146c36.687 27.806 76.147 84.186 90.636 114.439 14.489-30.253 53.948-86.633 90.636-114.439C277.107-.917 320-16.44 320 32.957c0 9.865-5.603 82.875-8.889 94.729-11.423 41.208-53.045 51.719-90.071 45.357 64.719 11.12 81.182 47.953 45.627 84.785-80 82.874-106.667-44.333-106.667-44.333s-26.667 127.207-106.667 44.333c-35.555-36.832-19.092-73.665 45.627-84.785-37.026 6.362-78.648-4.149-90.071-45.357C5.603 115.832 0 42.822 0 32.957 0-16.44 42.893-.917 69.364 19.147Z"></path></svg></div>`}(e,{profile:a}),e.out+=" ",r.length>0){const s=r;e.out+='<div class="feed s-f12rvk">';for(let a=0,t=s.length;a<t;a++){de(e,{item:s[a]})}e.out+=' <div class="end-marker s-f12rvk"><div class="dot s-f12rvk"></div></div></div>'}else e.out+='<div class="message s-f12rvk">This user has not made any posts.</div>'}})}var ue=l("<bluesky-profile-feed><!></bluesky-profile-feed>",2);function ve(l,o){e(o,!0);var n=ue(),d=r(n);g(d,(()=>function(e,s){const a={out:""};return pe(a,s?.props??{}),{head:"",body:a.out}}(0,{props:o.data}).body)),s((()=>a(n,"actor",o.data.profile?.did))),t(l,n),i()}var fe=l("<li><p>Insert the following scripts and stylesheets to the <code>&lt;head&gt;</code> of your website.</p> <!></li> <li><p>Insert the following markup in wherever you want the profile feed to be.</p> <!></li>",1),me=l("<!> <!>",1);function he(a,l){let g;e(l,!0);const A=m((()=>{g?.abort(),g=new AbortController;const e=g.signal;return(async e=>{const s=e.actor,a=e.allowUnauthenticated??!1,t=new y({handler:k({service:e.serviceUri??"https://public.api.bsky.app"})}),[{data:i},{data:l}]=await Promise.all([t.get("app.bsky.actor.getProfile",{signal:e.signal,params:{actor:s}}).catch((e=>e instanceof $&&"InvalidRequest"===e.kind&&"Profile not found"===e.description?{data:null}:Promise.reject(e))),t.get("app.bsky.feed.getAuthorFeed",{signal:e.signal,params:{actor:s,includePins:e.includePins,limit:30,filter:"posts_and_author_threads"}}).catch((e=>e instanceof $&&"InvalidRequest"===e.kind&&"Profile not found"===e.description?{data:{feed:[]}}:Promise.reject(e)))]);return{profile:i,feed:l.feed,allowUnauthenticated:a}})({actor:l.matched.actor,signal:e})}));w((()=>{g?.abort()}));const F=()=>{const e="https://cdn.jsdelivr.net/npm/bluesky-profile-feed-embed@^1.0.0";return`\x3c!-- Core web component and styling --\x3e\n<script type="module" src="${e}/+esm"><\/script>\n<link rel="stylesheet" href="${e}/dist/core.min.css">\n\n\x3c!-- Built-in themes --\x3e\n<link rel="stylesheet" href="${e}/themes/light.min.css" media="(prefers-color-scheme: light)">\n<link rel="stylesheet" href="${e}/themes/dim.min.css" media="(prefers-color-scheme: dark)">\n`};var _=o(),B=n(_);d(B,(()=>v(A)),(e=>{b(e,{})}),((e,s)=>{var a=me(),i=n(a);ve(i,{get data(){return v(s)}});var l=f(i,2),o=e=>{j(e,{title:"How do I embed this to my website?",children:(e,a)=>{Z(e,{children:(e,a)=>{var i=fe(),l=n(i),o=f(r(l),2),d=m(F);M(o,{get code(){return v(d)}}),q(l);var c=f(l,2),p=f(r(c),2),u=m((()=>(e=>{const s=`https://bsky.app/profile/${e.did}`;return`<bluesky-profile-feed actor="${C(e.did)}" include-pins>\n  <a target="_blank" href="${C(s)}" class="bluesky-profile-feed-fallback">\n    ${e.displayName?.trim()?`Posts by ${C(e.displayName)} (@${C(e.handle)})`:`Posts by @${C(e.handle)}`}\n  </a>\n</bluesky-profile-feed>\n`})(v(s).profile)));M(p,{get code(){return v(u)}}),q(c),t(e,i)},$$slots:{default:!0}})},$$slots:{default:!0}})};h(l,(e=>{v(s).profile&&e(o)})),t(e,a)}),((e,a)=>{c(e,{type:"alert",children:(e,i)=>{x();var l=p();s((()=>u(l,""+v(a)))),t(e,l)},$$slots:{default:!0}})})),t(a,_),i()}export{he as default};
