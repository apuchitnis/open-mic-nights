(this["webpackJsonpopen-mic-nights"]=this["webpackJsonpopen-mic-nights"]||[]).push([[0],{241:function(e,t,n){},288:function(e,t){},290:function(e,t){},299:function(e,t){},301:function(e,t){},327:function(e,t){},329:function(e,t){},330:function(e,t){},335:function(e,t){},337:function(e,t){},356:function(e,t){},368:function(e,t){},371:function(e,t){},419:function(e,t,n){"use strict";n.r(t);var a=n(99),s=n(100),r=n(103),c=n(102),i=n(7),l=n.n(i),o=n(10),d=n(211),u=n(213),b=n(214),j=n(13),h=n.n(j),m=n(98),p=n.n(m),O=n(212),x=n.n(O),f=(n(241),n(101)),g=n.p+"static/media/apple-touch-icon.c9916e86.png",v=n(0),w=n(244).GoogleSpreadsheet;function k(e){var t=e.column,n=t.filterValue,a=t.setFilter,s=t.preFilteredRows,r=t.id,c=h.a.useMemo((function(){var e=new Set;return s.forEach((function(t){e.add(t.values[r])})),Object(b.a)(e.values())}),[r,s]);return Object(v.jsxs)("select",{className:"select is-small",value:n,onChange:function(e){a(e.target.value||void 0)},children:[Object(v.jsx)("option",{value:"",children:"All"}),c.map((function(e,t){return Object(v.jsx)("option",{value:e,children:e},t)}))]})}function N(e){var t=e.column,n=t.filterValue,a=t.setFilter;return Object(v.jsx)("input",{className:"input is-small",value:n||"",onChange:function(e){return a(e.target.value)}})}function y(){var e=Object(j.useState)({headerValues:null,rows:[],isFetching:!1}),t=Object(u.a)(e,2),n=t[0],a=t[1];Object(j.useEffect)((function(){Object(d.a)(l.a.mark((function e(){var t,s,r;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a(Object(o.a)(Object(o.a)({},n),{},{isFetching:!0})),(t=new w("1uwHo4bGisUiQgwAnkFbVUZG2fabZD-uwaNx4JHlWnSs")).useApiKey("AIzaSyDWzk5MJLYVpzppXB9xxJWjVJnoe97erbc"),e.next=6,t.loadInfo();case 6:return s=t.sheetsByIndex[0],e.next=9,s.getRows();case 9:r=e.sent,a({headerValues:s.headerValues,rows:r,isFetching:!1}),e.next=17;break;case 13:e.prev=13,e.t0=e.catch(0),console.error(e.t0),a(Object(o.a)(Object(o.a)({},n),{},{isFetching:!1}));case 17:case"end":return e.stop()}}),e,null,[[0,13]])})))()}),[]);var s=h.a.useMemo((function(){return n.isFetching||null==n.headerValues?[]:n.rows.map((function(e){return{RowNumber:e.rowNumber,Bringer:e.Bringer,FacebookPage:e["Facebook Page"],FacebookGroup:e["Facebook Group"],Frequency:e.Frequency,Name:e.Name,Venue:e.Venue,Latitude:e.Latitude,Longitude:e.Longitude,Weekday:e["Weekday / Month"],Address:e.Address,Indoor:e["Indoor / Outdoor"],BackOn:e["Back on"],Category:e["Event Category"],Level:e["Comedian Level"],Description:e["Event Description"],Website:e.Website}}))}),[n]),r=h.a.useMemo((function(){return n.isFetching||null==n.headerValues?[]:[{Header:"Name",accessor:"Name",Filter:N},{Header:"Bringer",accessor:"Bringer",Filter:k},{Header:"Weekday",accessor:"Weekday",Filter:N},{Header:"Venue",accessor:"Venue",Filter:N},{Header:"Address",accessor:"Address",disableFilters:!0,hideInitially:!0},{Header:"Facebook Page",accessor:"FacebookPage",disableFilters:!0},{Header:"BackOn",accessor:"BackOn",Filter:k,hideInitially:!0},{Header:"Frequency",accessor:"Frequency",Filter:N},{Header:"Indoor?",accessor:"Indoor",hideInitially:!0,Filter:k},{Header:"Category",accessor:"Category",hideInitially:!0,Filter:k},{Header:"Level",accessor:"Level",hideInitially:!0,Filter:k},{Header:"Website",accessor:"Website",hideInitially:!0,disableFilters:!0},{Header:"Description",accessor:"Description",hideInitially:!0,Filter:N},{Header:"Facebook Group",accessor:"FacebookGroup",hideInitially:!0,disableFilters:!0}]}),[n]),c=Object(f.useTable)({columns:r,data:s,initialState:{hiddenColumns:r.filter((function(e){return e.hideInitially})).map((function(e){return e.Header}))}},f.useFilters),i=c.getTableProps,b=c.getTableBodyProps,m=c.headerGroups,p=c.rows,O=c.prepareRow,x=c.allColumns;return Object(v.jsx)(v.Fragment,{children:Object(v.jsxs)("div",{className:"columns is-multiline",children:[Object(v.jsx)("span",{className:"map column is-12-mobile is-5-desktop",children:Object(v.jsx)(C,{results:p})}),Object(v.jsxs)("span",{className:"table_wrapper column is-12-mobile is-7-desktop",children:[Object(v.jsxs)("div",{id:"table-dropdown",className:"dropdown",children:[Object(v.jsx)("div",{className:"dropdown-trigger",children:Object(v.jsxs)("button",{className:"button",onClick:function(){return document.getElementById("table-dropdown").classList.toggle("is-active")},children:[Object(v.jsx)("span",{children:"Select columns \ud83d\udd3d"}),Object(v.jsx)("span",{className:"icon is-small",children:Object(v.jsx)("i",{className:"fas fa-angle-down"})})]})}),Object(v.jsx)("div",{className:"dropdown-menu",id:"dropdown-menu",role:"menu",children:x.map((function(e){return Object(v.jsx)("div",{className:"dropdown-content",children:Object(v.jsxs)("label",{className:"checkbox",children:[Object(v.jsx)("input",Object(o.a)({type:"checkbox"},e.getToggleHiddenProps())),e.id]})},e.id)}))})]}),Object(v.jsxs)("table",Object(o.a)(Object(o.a)({className:"table is-hoverable"},i()),{},{children:[Object(v.jsx)("thead",{children:m.map((function(e){return Object(v.jsx)("tr",Object(o.a)(Object(o.a)({},e.getHeaderGroupProps()),{},{children:e.headers.map((function(e){return Object(v.jsxs)("th",Object(o.a)(Object(o.a)({},e.getHeaderProps()),{},{children:[e.render("Header"),Object(v.jsx)("div",{children:e.canFilter?e.render("Filter"):null})]}))}))}))}))}),Object(v.jsx)("tbody",Object(o.a)(Object(o.a)({},b()),{},{children:p.map((function(e){return O(e),Object(v.jsx)("tr",Object(o.a)(Object(o.a)({},e.getRowProps()),{},{children:e.cells.map((function(e){return Object(v.jsx)("td",Object(o.a)(Object(o.a)({},e.getCellProps()),{},{children:e.render("Cell")}))}))}))}))}))]}))]})]})})}var F=function(e){var t=e.name;return Object(v.jsx)("div",{style:{position:"relative",bottom:50,left:"-45px",textAlign:"center",width:220,backgroundColor:"white",boxShadow:"0 2px 7px 1px rgba(0, 0, 0, 0.3)",padding:10,fontSize:14,zIndex:100,borderRadius:"25px"},children:Object(v.jsx)("div",{style:{fontSize:16},children:t})})},I=function(e){Object(r.a)(n,e);var t=Object(c.a)(n);function n(e){return Object(a.a)(this,n),t.call(this,e)}return Object(s.a)(n,[{key:"render",value:function(){return Object(v.jsx)("div",{className:this.props.show?"has-background-warning":"has-background-primary-dark",style:{border:"1px solid white",borderRadius:"50%",height:20,width:20,zIndex:10},children:this.props.show&&Object(v.jsx)(F,{name:this.props.name})})}}]),n}(h.a.Component),C=function(e){Object(r.a)(n,e);var t=Object(c.a)(n);function n(e){var s;return Object(a.a)(this,n),(s=t.call(this,e))._onChildClick=function(e,t){s.setState((function(t){var n=t.results.findIndex((function(e){return e.show}));return n>0&&t.results[n].original.RowNumber!=parseInt(e)&&(t.results[n].show=!1),n=t.results.findIndex((function(t){return t.original.RowNumber==parseInt(e)})),t.results[n].show=!t.results[n].show,{results:t.results}}))},s.state={results:[]},s}return Object(s.a)(n,[{key:"componentDidUpdate",value:function(e){this.props.results!=e.results&&this.setState((function(e,t){return{results:t.results.map((function(e){return Object(o.a)(Object(o.a)({},e),{},{show:!1})}))}}))}},{key:"render",value:function(){return Object(v.jsx)("div",{id:"map",children:Object(v.jsx)(x.a,{bootstrapURLKeys:{key:"AIzaSyB2xTrXYV7Y6bN1BVVPrt2ZUglBPTZ-2S4"},defaultCenter:{lat:51.5074,lng:-.05},defaultZoom:14,onChildClick:this._onChildClick,children:this.state.results.map((function(e){return Object(v.jsx)(I,{lat:e.original.Latitude,lng:e.original.Longitude,name:e.original.Name,show:e.show},e.original.RowNumber)}))})})}}]),n}(h.a.Component);function H(){return Object(v.jsxs)(v.Fragment,{children:[Object(v.jsxs)("nav",{className:"navbar is-light has-shadow py-4 mb-2",children:[Object(v.jsxs)("div",{className:"navbar-brand",children:[Object(v.jsx)("a",{className:"navbar-item",children:Object(v.jsx)("img",{src:g,style:{maxHeight:"60px"}})}),Object(v.jsx)("div",{className:"navbar-item",children:Object(v.jsx)("p",{className:"title",children:"\ud83c\udf99Perform comedy near you"})}),Object(v.jsxs)("div",{className:"navbar-burger",onClick:function(){return document.getElementById("nav-links").classList.toggle("is-active")},children:[Object(v.jsx)("span",{}),Object(v.jsx)("span",{}),Object(v.jsx)("span",{})]})]}),Object(v.jsx)("div",{className:"navbar-menu",id:"nav-links",children:Object(v.jsxs)("div",{className:"navbar-end",children:[Object(v.jsx)("a",{className:"navbar-item",children:"Facebook"}),Object(v.jsx)("a",{className:"navbar-item",children:"Sheet"}),Object(v.jsx)("a",{className:"navbar-item",children:"\ud83d\ude4f Submit feedback \ud83d\ude4f"})]})})]}),Object(v.jsx)(y,{}),Object(v.jsx)("div",{className:"section",children:Object(v.jsxs)("div",{className:"container",children:[Object(v.jsx)("div",{className:"columns is-vcentered",children:[{question:"My night's details are out of date! \u231a",answer:"Just let us know! We'll make a asap: email@example.com"},{question:"I have feedback to share / found a bug! \ud83d\udc1b",answer:"Good hunting \ud83d\ude04 Send us feedback here: ..."}].map((function(e){return Object(v.jsx)("div",{className:"column",children:Object(v.jsxs)("div",{className:"card",children:[Object(v.jsx)("div",{className:"card-header",children:Object(v.jsx)("div",{className:"card-header-title",children:e.question})}),Object(v.jsx)("div",{className:"card-content",children:Object(v.jsx)("div",{className:"content",children:e.answer})})]})},e.question)}))}),Object(v.jsxs)("p",{className:"has-text-centered my-2 mx-2",children:["Website created with \u2764 by ",Object(v.jsx)("a",{href:"https://apuchitnis.github.io/",children:"@apuchitnis"}),". Thanks to GC for compiling all of the data."]})]})})]})}var B=document.getElementById("app");p.a.render(Object(v.jsx)(H,{}),B)},95:function(e,t){}},[[419,1,2]]]);
//# sourceMappingURL=main.998cc87f.chunk.js.map