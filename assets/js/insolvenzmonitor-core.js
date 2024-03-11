
let search_result_set;
let numberOfItems;
let limitPerPage;
let totalPages;
let paginationSize;
let new_user_id;
let selected_array={
    'company_name':'',
    'residence':'',
    'local_court':'',
    'file_number':'',
    'CommercialRegisterNumber':'', 
    'dateofnotice':'',
}; 
// let local_search_data=sessionStorage.getItem("search_data");
// let local_adv_search_obj= JSON.parse(sessionStorage.getItem("adv_search_obj"));
// let local_resultset_obj= JSON.parse(sessionStorage.getItem("resultset_obj"));


(function() {
    class InsolvenzMonitorCore {
    
        #template;
        constructor() {
            this.#template = null
        }
        
        frontpageSearch(template, user_id) {
            this.#template = template
            new_user_id=user_id;
           
            const search = document.querySelector('#search');
            const search_button = document.querySelector('#search_button');
            const main_search_item=document.querySelector('.main_search_item');
            const main_site_logo_icon=document.querySelector('.main_site_logo_icon');
            const suche_item=document.querySelector('.suche_item');
            // const advanced_search_btn = document.querySelector('.advanced_search_btn');
            const reset_field_data=document.querySelector('.reset_field_data');
            if (search) {
                
                search.addEventListener('keypress', e => e.code === 'Enter' ? this.operateAdvanceSearchbymain(user_id) : null);
                search_button.addEventListener('click', _ => this.operateAdvanceSearchbymain(user_id));
                search.addEventListener('input', _ => this.hideAll(search));

            }
            if(main_search_item)
            {
                main_search_item.addEventListener('click', _ => this.remove_main_search());
            }
          
        
        
            if(sessionStorage.getItem("search_data")!=null)
            {
                console.log(sessionStorage.getItem("search_data"));
                const page_loader=document.querySelector('.page_loader');
                if(page_loader)
                {
                    page_loader.classList.add("spinner", "loading");
                }
                if(search)
                {
                    search.value=sessionStorage.getItem("search_data");  
                }
            
                selected_array=JSON.parse(sessionStorage.getItem("adv_search_obj"));
                search_result_set=JSON.parse(sessionStorage.getItem("resultset_obj"));
                // this.operateAdvanceSearch(user_id)
                // this.operate_advance_search_by_change_ele(user_id);

                console.log("check selected array1",selected_array);
                const main_search_item=document.querySelector('.main_search_item');
                if(main_search_item)
                {
                    main_search_item.innerHTML="<span id='main_search_item_content'>"+search.value+" <i class='fa fa-times-circle-o'></i></span>";
                }
          

                const main_adv_search_item=document.querySelector('#main_adv_search_item');
                const adv_search_item_company=document.querySelector('#adv_search_item_company');
                const adv_search_item_resi=document.querySelector('#adv_search_item_resi');
                const adv_search_item_lc=document.querySelector('#adv_search_item_lc');
                const adv_search_item_fl=document.querySelector('#adv_search_item_fl');
                const adv_search_item_crn=document.querySelector('#adv_search_item_crn');
                const adv_search_item_date=document.querySelector('#adv_search_item_date');

                  const search_results_main=document.querySelector('#search_results_main');
                //   const tb_cus_container=document.querySelector('.tb_cus_container');
                  if(search_results_main)
                  {
                       search_results_main.style.display="block";  
                  }

                 // tb_cus_container.style.display="block";

                if(selected_array['company_name']!="")
                {
                    adv_search_item_company.innerHTML="<span id='adv_search_item_company_content'>"+selected_array['company_name']+" <i class='fa fa-times-circle-o'></i></span>";
                }    
            
                if(selected_array['local_court']!="")
                {
                    adv_search_item_lc.innerHTML="<span id='adv_search_item_lc_content'>"+selected_array['local_court']+" <i class='fa fa-times-circle-o'></i></span>";
                }  
                if(selected_array['residence']!="")
                {
                    adv_search_item_resi.innerHTML="<span id='adv_search_item_resi_content'>"+selected_array['residence']+" <i class='fa fa-times-circle-o'></i></span>";
                }  
                if(selected_array['file_number']!="")
                {
                    adv_search_item_fl.innerHTML="<span id='adv_search_item_fl_content'> "+selected_array['file_number']+" <i class='fa fa-times-circle-o'></i></span>";
                }   
                if(selected_array['CommercialRegisterNumber']!="")
                {
                    adv_search_item_crn.innerHTML="<span id='adv_search_item_crn_content'> "+selected_array['CommercialRegisterNumber']+" <i class='fa fa-times-circle-o'></i></span>";
                } 
                if(selected_array['dateofnotice']!="")
                {
                

                    adv_search_item_date.innerHTML="<span id='adv_search_item_date_content'> "+selected_array['dateofnotice']+" <i class='fa fa-times-circle-o'></i></span>";
                }  
                if(window.location.href.trim().split('/')[3]=="suche" || window.location.href.trim().split('/')[3]==""|| window.location.href.trim().split('/')[3]=="new-home"||window.location.href.trim().split('/')[3]=="?watch-limit=1#pricing")
                {
                    this.reloadHtml(search_result_set);
                    this.reload_search_table(search_result_set,user_id);
                }

               
                
                setTimeout(function(){
                    if(page_loader)
                    {
                        page_loader.classList.remove("spinner", "loading");   
                    }
                              
                    }, 1000); 
                    
               if(!user_id) {
                    const showSignModal = document.querySelectorAll('.search-no-login');
                    showSignModal.forEach(
                        modal => 
                            modal.addEventListener('click', _ => this.openSingInModal())
                    )
                } 


            }
            if(reset_field_data)
            {
                reset_field_data.addEventListener('click', _ => this.remove_main_search());
        
                // reset_field_data.addEventListener('click', _ => this.clearSearchData());
                // reset_field_data.addEventListener('click', _ => this.operateAdvanceSearch(user_id));            
                   
            }

            if(suche_item){
                suche_item.addEventListener('click', _ => this.remove_main_search()) 
            }
            if(main_site_logo_icon)
            {
                main_site_logo_icon.addEventListener('click', _ => this.remove_main_search()) 
            }
            if(window.location.href.trim().includes('search-limit=1#pricing'))
            {
               document.querySelector('#search_results_main').style.display="none";
            }      
                

             
        }

    
        remove_main_search = () =>{
            console.log("clear all clicked");
            sessionStorage.removeItem("search_data");
            sessionStorage.removeItem("adv_search_obj");
            sessionStorage.removeItem("resultset_obj");
            const main_search_item=document.querySelector('.main_search_item');
            if(main_search_item)
            {
                main_search_item.innerHTML="";
            }
       
            const paginationDiv=document.querySelector('.pagination');
            const search = document.querySelector('#search');
            search.value="";
             const page_loader=document.querySelector('.page_loader');
             page_loader.classList.add("spinner", "loading");
             const hero_container=document.querySelector('.hero_container');
             const common_container=document.querySelector('.common_container');
             if(hero_container)
             {
                 hero_container.classList.add('body_visibility')
             }
             if(common_container)
             {
                 common_container.classList.add('body_visibility'); 
             }

             const noResults = document.querySelector('#search_results_empty');
             const search_results_main=document.querySelector('#search_results_main');
            // const tb_cus_container=document.querySelector('.tb_cus_container');
             const advanced_search_field_warpper=document.querySelector('.advanced_search_field_warpper');
             advanced_search_field_warpper.style.display="none";
             search_results_main.style.display="none";
            //  tb_cus_container.style.display="none";
             noResults.style.display="none";
             paginationDiv.innerHTML='';
             setTimeout(function(){
                 page_loader.classList.remove("spinner", "loading"); 
                 if(hero_container)
                 {
                     hero_container.classList.remove('body_visibility');   
                 }
         
                 if(common_container)
                 {
                     common_container.classList.remove('body_visibility'); 
                 }                    
                 }, 1000); 
                //  if(window.location.href.trim().split('?')[1]=="prev")
                //  {
                //     local_search_data="";
                //     Object.keys(selected_array).forEach(function(key) {
                //         selected_array[key]="";
                //      });
                //    jQuery('#adv_search_item_company_content').remove();
                //    jQuery('#adv_search_item_resi_content').remove();
                //    jQuery('#adv_search_item_lc_content').remove();
                //    jQuery('#adv_search_item_fl_content').remove();
                //    jQuery('#adv_search_item_crn_content').remove();
                //    jQuery('#adv_search_item_date_content').remove();
                //  }
               
                 
     
        
         }
    
         //cross advance search
         cross_advance_search = (user_id)=>{  
            this.operateAdvanceSearch(user_id);
      
        }
       // Hide All
       hideAll =(ele) =>{
            if(ele.value.trim().length==0)
            {
                sessionStorage.removeItem("search_data");
                sessionStorage.removeItem("adv_search_obj");
                sessionStorage.removeItem("resultset_obj");
                const paginationDiv=document.querySelector('.pagination');
                // const page_loader=document.querySelector('.page_loader');
                // page_loader.classList.add("spinner", "loading");
                // const hero_container=document.querySelector('.hero_container');
                // if(hero_container)
                // {
                //     hero_container.classList.add('body_visibility')
                // }
                // const common_container=document.querySelector('.common_container');
                // if(common_container)
                // {
                //     common_container.classList.add('body_visibility'); 
                // }

                const noResults = document.querySelector('#search_results_empty');
                const search_results_main=document.querySelector('#search_results_main');
                // const tb_cus_container=document.querySelector('.tb_cus_container');
                const advanced_search_field_warpper=document.querySelector('.advanced_search_field_warpper');
                advanced_search_field_warpper.style.display="none";
                search_results_main.style.display="none";
                // tb_cus_container.style.display="none";
                noResults.style.display="none";
                noResults.style.display="none";
                paginationDiv.innerHTML="";
                // setTimeout(function(){
                //     page_loader.classList.remove("spinner", "loading"); 
                //     hero_container.classList.remove('body_visibility');                        
                //     }, 1000);  
                // if(window.location.href.trim().split('?')[1]=="prev")
                // {
                //     local_search_data="";
                //     Object.keys(selected_array).forEach(function(key) {
                //         selected_array[key]="";
                //      });
                //    jQuery('#adv_search_item_company_content').remove();
                //    jQuery('#adv_search_item_resi_content').remove();
                //    jQuery('#adv_search_item_lc_content').remove();
                //    jQuery('#adv_search_item_fl_content').remove();
                //    jQuery('#adv_search_item_crn_content').remove();
                //    jQuery('#adv_search_item_date_content').remove();
                // }


            }
       }



       //clear search data
       clearSearchData =()=>{
        jQuery('#adv_search_item_company_content').remove();
        jQuery('#adv_search_item_resi_content').remove();
        jQuery('#adv_search_item_lc_content').remove();
        jQuery('#adv_search_item_fl_content').remove();
        jQuery('#adv_search_item_crn_content').remove();
        jQuery('#adv_search_item_date_content').remove();

        Object.keys(selected_array).forEach(function(key) {
             selected_array[key]="";
          })
      

        // const company_name=document.querySelector('#company_name');
        // const residence=document.querySelector('#residence');
        // const local_court=document.querySelector('#local_court');
        // const CommercialRegisterNumber=document.querySelector('#CommercialRegisterNumber');
        // const file_number=document.querySelector('#file_number');
        // const dateofnotice=document.querySelector('#dateofnoticstuckinge');
        // company_name.innerHTML="<option value=''></option>";
        // residence.innerHTML="<option value=''></option>";
        // local_court.innerHTML="<option value=''></option>";
        // CommercialRegisterNumber.innerHTML="<option value=''></option>";
        // file_number.innerHTML="<option value=''></option>";
        // dateofnotice.innerHTML="<option value=''></option>";

        // input_search_selects.forEach(search_select_ele => {
        //     search_select_ele.value="";
        //  }); 
       }

       //Advance search by change element
       operate_advance_search_by_change_ele = (user_id) =>{
    
          const main_adv_search_item=document.querySelector('#main_adv_search_item');
          const adv_search_item_company=document.querySelector('#adv_search_item_company');
          const adv_search_item_resi=document.querySelector('#adv_search_item_resi');
          const adv_search_item_lc=document.querySelector('#adv_search_item_lc');
          const adv_search_item_fl=document.querySelector('#adv_search_item_fl');
          const adv_search_item_crn=document.querySelector('#adv_search_item_crn');
          const adv_search_item_date=document.querySelector('#adv_search_item_date');


          const search_results_main=document.querySelector('#search_results_main');
        //   const tb_cus_container=document.querySelector('.tb_cus_container');
          search_results_main.style.display="block";
        //   tb_cus_container.style.display="block";
         if(selected_array['company_name']!="")
         {
            adv_search_item_company.innerHTML="<span id='adv_search_item_company_content'>"+selected_array['company_name']+" <i class='fa fa-times-circle-o'></i></span>";
         }    
       
         if(selected_array['local_court']!="")
         {
            adv_search_item_lc.innerHTML="<span id='adv_search_item_lc_content'>"+selected_array['local_court']+" <i class='fa fa-times-circle-o'></i></span>";
         }  
         if(selected_array['residence']!="")
         {
            adv_search_item_resi.innerHTML="<span id='adv_search_item_resi_content'>"+selected_array['residence']+" <i class='fa fa-times-circle-o'></i></span>";
         }  
         if(selected_array['file_number']!="")
         {
            adv_search_item_fl.innerHTML="<span id='adv_search_item_fl_content'> "+selected_array['file_number']+" <i class='fa fa-times-circle-o'></i></span>";
         }   
         if(selected_array['CommercialRegisterNumber']!="")
         {
            adv_search_item_crn.innerHTML="<span id='adv_search_item_crn_content'> "+selected_array['CommercialRegisterNumber']+" <i class='fa fa-times-circle-o'></i></span>";
         } 
         if(selected_array['dateofnotice']!="")
         {
          

            adv_search_item_date.innerHTML="<span id='adv_search_item_date_content'> "+selected_array['dateofnotice']+" <i class='fa fa-times-circle-o'></i></span>";
         }        
     
        
          var resultset=new Array();
     
          if(selected_array['residence']!="" || selected_array['company_name']!=""  || selected_array['dateofnotice']!=""  || selected_array['local_court']!=""  || selected_array['file_number']!=""  || selected_array['CommercialRegisterNumber']!="")
          {
            
            const page_loader=document.querySelector('.page_loader');
            page_loader.classList.add("spinner", "loading");
            const hero_container=document.querySelector('.hero_container');
            if(hero_container)
            {
                hero_container.classList.add('body_visibility')
            }
            const common_container=document.querySelector('.common_container');

            if(common_container)
            {
                common_container.classList.add('body_visibility'); 
            }
        
                if(selected_array['company_name']!="")
                {
                
                
                    for (var key in search_result_set) {
                        if (search_result_set.hasOwnProperty(key)) {
                        var val = search_result_set[key];
                            
                            if(selected_array['company_name']==val.NameOfDebtor)
                            {
                                resultset[key]=val;
                            }
                        }
                    }
                    search_result_set=resultset;
                }
                if(selected_array['residence']!="")
                {
                    for (var key in search_result_set) {
                        if (search_result_set.hasOwnProperty(key)) {
                        var val = search_result_set[key];
                                if(selected_array['residence']==val.Residence)
                                {
                                    resultset[key]=val;
                                }
                            }
                        }
                search_result_set=resultset;
            
                
                }
                if(selected_array['local_court']!="")
                {
                    for (var key in search_result_set) {
                        if (search_result_set.hasOwnProperty(key)) {
                        var val = search_result_set[key];
                    
                            if(selected_array['local_court']==val.LocalCourt)
                            {
                            resultset[key]=val;
                            }
                        }
                    }
                
                
                    search_result_set=resultset;
            
                }
                if(selected_array['file_number']!="")
                {
                    for (var key in search_result_set) {
                        if (search_result_set.hasOwnProperty(key)) {
                        var val = search_result_set[key];
                    
                            if(selected_array['file_number']==val.FileNumber)
                            {
                            resultset[key]=val;
                            }
                        }
                    }
                    search_result_set=resultset;
                }


                if(selected_array['CommercialRegisterNumber']!="")
                {
                    for (var key in search_result_set) {
                        if (search_result_set.hasOwnProperty(key)) {
                        var val = search_result_set[key];
                
                            if(selected_array['CommercialRegisterNumber']==val.CommercialRegisterNumber)
                            {
                            resultset[key]=val;
                            }
                        }
                    }
                search_result_set=resultset;
                }
            
                if(selected_array['dateofnotice']!="")
                {
                for (var key in search_result_set) {
                        if (search_result_set.hasOwnProperty(key)) {
                        var val = search_result_set[key];
                    
                            if(selected_array['dateofnotice']==val.DateOfNotice)
                            {
                            resultset[key]=val;
                            }                         
                    }
                }
                search_result_set=resultset;
                }
            //store resultset
        

            sessionStorage.setItem('resultset_obj', JSON.stringify(search_result_set));   
               //call Rendered Html
            // this.reloadHtml(resultset,selected_ele,selected_attr);
            this.reloadHtml(resultset);
            //rendered search table
            this.reload_search_table(search_result_set,user_id);

            setTimeout(function(){
                   page_loader.classList.remove("spinner", "loading");  
                   if(hero_container)
                   {
                       hero_container.classList.remove('body_visibility');   
                   }
           
                   if(common_container)
                   {
                       common_container.classList.remove('body_visibility'); 
                   }                     
           }, 1000);    
            if (!user_id) {
                const showSignModal = document.querySelectorAll('.search-no-login');
                showSignModal.forEach(
                    modal => 
                        modal.addEventListener('click', _ => this.openSingInModal())
                )
            } 
         }

         

       }
        /// Advance search 
        operateAdvanceSearch = user_id =>{

            const searchBarSection= document.querySelector('.searchBarSection');
            const input_search_selects=document.querySelectorAll('.search_input_holder input');
            const search = document.querySelector('#search');
            const empty_search_error= document.querySelector('#empty_search_error');
            const advance_search_msg=document.querySelector('.advance_search_msg');
            const page_loader=document.querySelector('.page_loader');
            const main_search_item=document.querySelector('.main_search_item');
           
            if(search.value.length >2)
            {   
                var resultset=new Array();
                input_search_selects.forEach(search_select_ele => {
                    search_select_ele.value="";
                 });   
                page_loader.classList.add("spinner", "loading");
                const hero_container=document.querySelector('.hero_container');
                if(hero_container)
                {
                    hero_container.classList.add('body_visibility');
                }
                const common_container=document.querySelector('.common_container');
                if(common_container)
                {
                    common_container.classList.add('body_visibility'); 
                }
          
             
                empty_search_error.innerHTML="";
                fetch('/'+window.location.href.trim().split('/')[3].trim()+'/wp-json/insolvenz-monitor/v1/search?search=' + search.value, {
                    method: 'GET',
                    credentials: 'same-origin',
                })
                .then(response => response.json())
                .then(res => {
                   
                    var IK_filter= new Array();
                    for (var key in res) {
        
                        if (res.hasOwnProperty(key)) {
                            
                            var filenm=res[key].FileNumber;
                            if(!filenm.includes("IK"))
                            {
                                IK_filter.push(res[key]);
                               // console.log("result is here", IK_filter); 
                            }
        
                            
                        }
                    }



                    if(selected_array['residence']=="" && selected_array['company_name']==""  && selected_array['dateofnotice']==""  && selected_array['local_court']==""  && selected_array['file_number']==""  && selected_array['CommercialRegisterNumber']=="")
                    {
                        search_result_set=IK_filter;
                    }
                    else
                    {
                        search_result_set=IK_filter;

                         if(selected_array['company_name']!="")
                        {
                        
                        
                            for (var key in search_result_set) {
                                if (search_result_set.hasOwnProperty(key)) {
                                var val = search_result_set[key];
                                    
                                    if(selected_array['company_name']==val.NameOfDebtor)
                                    {
                                        resultset[key]=val;
                                    }
                                }
                            }
                            search_result_set=resultset;
                        }
                        if(selected_array['residence']!="")
                        {
                            for (var key in search_result_set) {
                                if (search_result_set.hasOwnProperty(key)) {
                                var val = search_result_set[key];
                                        if(selected_array['residence']==val.Residence)
                                        {
                                            resultset[key]=val;
                                        }
                                    }
                                }
                        search_result_set=resultset;
                    
                        
                        }
                        if(selected_array['local_court']!="")
                        {
                            for (var key in search_result_set) {
                                if (search_result_set.hasOwnProperty(key)) {
                                var val = search_result_set[key];
                            
                                    if(selected_array['local_court']==val.LocalCourt)
                                    {
                                     resultset[key]=val;
                                    }
                                }
                            }
                        
                        
                            search_result_set=resultset;
                     
                        }
                        if(selected_array['file_number']!="")
                        {
                            for (var key in search_result_set) {
                                if (search_result_set.hasOwnProperty(key)) {
                                var val = search_result_set[key];
                            
                                    if(selected_array['file_number']==val.FileNumber)
                                    {
                                    resultset[key]=val;
                                    }
                                }
                            }
                            search_result_set=resultset;
                        }


                        if(selected_array['CommercialRegisterNumber']!="")
                        {
                            for (var key in search_result_set) {
                                if (search_result_set.hasOwnProperty(key)) {
                                var val = search_result_set[key];
                        
                                    if(selected_array['CommercialRegisterNumber']==val.CommercialRegisterNumber)
                                    {
                                    resultset[key]=val;
                                    }
                                }
                            }
                        search_result_set=resultset;
                        }
                    
                        if(selected_array['dateofnotice']!="")
                        {
                        for (var key in search_result_set) {
                                if (search_result_set.hasOwnProperty(key)) {
                                var val = search_result_set[key];
                            
                                    if(selected_array['dateofnotice']==val.DateOfNotice)
                                    {
                                    resultset[key]=val;
                                    }                         
                            }
                        }
                        search_result_set=resultset;
                        }
                    }
                  
                   //call Rendered Html
                  
                
                       this.reloadHtml(search_result_set);
                       this.reload_search_table(search_result_set,user_id);
                   
                   
                 
                  if(searchBarSection){
                    searchBarSection.style.marginBottom="0";
                  }
                   
                   main_search_item.innerHTML="<span id='main_search_item_content'>"+search.value+" <i class='fa fa-times-circle-o'></i></span>";
                    setTimeout(function(){
                    page_loader.classList.remove("spinner", "loading"); 
                    if(hero_container)
                    {
                        hero_container.classList.remove('body_visibility');   
                    }
            
                    if(common_container)
                    {
                        common_container.classList.remove('body_visibility'); 
                    }                    
                    }, 1000);  
                 

                }).then(_ => {
                    if (!user_id) {
                        const showSignModal = document.querySelectorAll('.search-no-login');
                        showSignModal.forEach(
                            modal => 
                                modal.addEventListener('click', _ => this.openSingInModal())
                        )
                    }
                });
            }
            else
            {
                empty_search_error.innerHTML="Bitte geben Sie einen Suchbegriff ein. Der Suchbegriff muss aus mindestens 3 Zeichen bestehen.";
                const advanced_search_field_warpper=document.querySelector('.advanced_search_field_warpper');
                const search_results_main=document.querySelector('#search_results_main');
                // const tb_cus_container=document.querySelector('.tb_cus_container');
                search_results_main.style.display="none";
                // tb_cus_container.style.display="none";
                advanced_search_field_warpper.style.display="none";
            }
           
        }



   /// Advance search 
   operateAdvanceSearchbymain = user_id =>{
   
    // if(window.location.href.trim().split('?')[1]=="prev")
    // {
    //     window.location="/";  
    // }
  
    const searchBarSection= document.querySelector('.searchBarSection');
    const input_search_selects=document.querySelectorAll('.search_input_holder input');
    const search = document.querySelector('#search');
    const empty_search_error= document.querySelector('#empty_search_error');
    const advance_search_msg=document.querySelector('.advance_search_msg');
    const page_loader=document.querySelector('.page_loader');
    const main_search_item=document.querySelector('.main_search_item');
  
    if(search.value.length >2)
    {   
      Object.keys(selected_array).forEach(function(key) {
             selected_array[key]="";
          });
        jQuery('#adv_search_item_company_content').remove();
        jQuery('#adv_search_item_resi_content').remove();
        jQuery('#adv_search_item_lc_content').remove();
        jQuery('#adv_search_item_fl_content').remove();
        jQuery('#adv_search_item_crn_content').remove();
        jQuery('#adv_search_item_date_content').remove();
        var resultset=new Array();
        input_search_selects.forEach(search_select_ele => {
            search_select_ele.value="";
         });   
        page_loader.classList.add("spinner", "loading");
        const hero_container=document.querySelector('.hero_container');
        const common_container=document.querySelector('.common_container');
        if(hero_container)
        {
            hero_container.classList.add('body_visibility')
        }

        if(common_container)
        {
            common_container.classList.add('body_visibility'); 
        }
        empty_search_error.innerHTML="";
        fetch('/'+window.location.href.trim().split('/')[3].trim()+'/wp-json/insolvenz-monitor/v1/search?search=' + search.value, {
            method: 'GET',
            credentials: 'same-origin',
        })
        .then(response => response.json())
        .then(res => {

            console.log("result here",res);

            var IK_filter= new Array();
            for (var key in res) {

                if (res.hasOwnProperty(key)) {
                    
                    var filenm=res[key].FileNumber;
                    if(!filenm.includes("IK"))
                    {
                        IK_filter.push(res[key]);
                       // console.log("result is here", IK_filter); 
                    }

                    
                }
            }
         
            search_result_set=IK_filter;

           //call Rendered Html
     
               this.reloadHtml(search_result_set);
               this.reload_search_table(search_result_set,user_id);
           
           
         
          if(searchBarSection){
            searchBarSection.style.marginBottom="0";
          }
           
           main_search_item.innerHTML="<span id='main_search_item_content'>"+search.value+" <i class='fa fa-times-circle-o'></i></span>";
            setTimeout(function(){
            page_loader.classList.remove("spinner", "loading"); 
            if(hero_container)
            {
                hero_container.classList.remove('body_visibility');   
            }
    
            if(common_container)
            {
                common_container.classList.remove('body_visibility'); 
            }
                     
            }, 1000);  
         

        }).then(_ => {
            if (!user_id) {
                const showSignModal = document.querySelectorAll('.search-no-login');
                showSignModal.forEach(
                    modal => 
                        modal.addEventListener('click', _ => this.openSingInModal())
                )
            }
        });
    }
    else
    {
        empty_search_error.innerHTML="Bitte geben Sie einen Suchbegriff ein. Der Suchbegriff muss aus mindestens 3 Zeichen bestehen.";
        const advanced_search_field_warpper=document.querySelector('.advanced_search_field_warpper');
        const search_results_main=document.querySelector('#search_results_main');
        // const tb_cus_container=document.querySelector('.tb_cus_container');
        search_results_main.style.display="none";
        // tb_cus_container.style.display="none";
        advanced_search_field_warpper.style.display="none";
    }
   
}


        //Append Html after search event generate
        reloadHtml=(res) =>{
   
            const noResults = document.querySelector('#search_results_empty');
            const advanced_search_field_warpper=document.querySelector('.advanced_search_field_warpper');
            search_result_set=res;
            if(Object.keys(res).length === 0)
            {
                noResults.style.display="block";
               
            }
            else
            {
               if(advanced_search_field_warpper)
               {
                advanced_search_field_warpper.style.display="block";
               }
               if(noResults)
               {
                noResults.style.display="none";
               }
                
            }
            
            var NameOfDebtor =new Array();
            var Residence=new Array();
            var LocalCourt=new Array();
            var FileNumber=new Array();
            var CommercialRegisterNumber=new Array();
            var DateOfNotice=new Array();
            var html,html1,html2,html3,html4,html5;
            for (var key in res) {

                if (res.hasOwnProperty(key)) {
                  var val = res[key];
          
                  if(val!=null)
                  {
                    NameOfDebtor[key]=val.NameOfDebtor;
                    Residence[key]=val.Residence;
                    LocalCourt[key]=val.LocalCourt;
                    FileNumber[key]=val.FileNumber;
                    CommercialRegisterNumber[key]=val.CommercialRegisterNumber;
                    DateOfNotice[key]=val.DateOfNotice;
                  }
       
                }
            }
        
         

       
           


    
        //    Append Residence in advanced search dialog
        var fiter_residence =Residence.filter(function(itm, i, Residence) {
            return i == Residence.indexOf(itm);
            });

            fiter_residence=fiter_residence.sort();
            for(key in fiter_residence)
            {
                if(fiter_residence[key]){
                    var flag="";
                    // if(fiter_residence[key]==selected_ele &&selected_attr=="residence" && fiter_residence[key].length >0 )
                    // {
                    // flag="selected";     
                    // }
                    // else
                    // {
                    //     flag="";
                    // } 
                    if(fiter_residence[key]==selected_array['residence'] && fiter_residence[key].length >0 )
                    {
                    flag="selected";     
                    }
                    else
                    {
                        flag="";
                    } 


                     html+="<option value='"+fiter_residence[key]+"' "+flag+">"+fiter_residence[key]+"</option>"; 
                }
              
             
            }
            //Append Company name in advance search
            var fiter_NameOfDebtor =NameOfDebtor.filter(function(itm, i, NameOfDebtor) {
            return i == NameOfDebtor.indexOf(itm);
            });
            fiter_NameOfDebtor=fiter_NameOfDebtor.sort();
            for(key in fiter_NameOfDebtor)
            {
                if(fiter_NameOfDebtor[key]){
                    var flag="";
                    if(fiter_NameOfDebtor[key]==selected_array['company_name'] )
                    {
                    flag="selected";     
                    }
                    else
                    {
                        flag="";
                    } 
                    html1+="<option value='"+fiter_NameOfDebtor[key]+"' "+flag+">"+fiter_NameOfDebtor[key]+"</option>";
                }
             
            }
            //Append LocalCourt
            var fiter_LocalCourt =LocalCourt.filter(function(itm, i, LocalCourt) {
            return i == LocalCourt.indexOf(itm);
            });
            fiter_LocalCourt=fiter_LocalCourt.sort();
            for(key in fiter_LocalCourt)
            {
                if(fiter_LocalCourt[key])
                {
                    var flag="";
                    if(fiter_LocalCourt[key]==selected_array['local_court'])
                    {
                        flag="selected";     
                    }
                    else
                    {
                        flag="";
                    } 
                    html2+="<option value='"+fiter_LocalCourt[key]+"' "+flag+">"+fiter_LocalCourt[key]+"</option>"; 
                }
        
            }
            // Appened file number
            var fiter_FileNumber =FileNumber.filter(function(itm, i, FileNumber) {
                return i == FileNumber.indexOf(itm);
            });

            fiter_FileNumber=fiter_FileNumber.sort();
                for(key in fiter_FileNumber)
                {
                    if(fiter_FileNumber[key])
                    {
                        var flag="";
                        if(fiter_FileNumber[key]==selected_array['file_number'])
                        {
                            flag="selected";     
                        }
                        else
                        {
                            flag="";
                        } 
                        html3+="<option value='"+fiter_FileNumber[key]+"' "+flag+">"+fiter_FileNumber[key]+"</option>"; 
                    }
            
            }
             // Appened CRN
           
               var fiter_CommercialRegisterNumber =CommercialRegisterNumber.filter(function(itm, i, CommercialRegisterNumber) {
                return i == CommercialRegisterNumber.indexOf(itm);
                });
                fiter_CommercialRegisterNumber=fiter_CommercialRegisterNumber.sort();
                for(key in fiter_CommercialRegisterNumber)
                {
                  if(fiter_CommercialRegisterNumber[key]){
                    var flag="";
                    if(fiter_CommercialRegisterNumber[key]==selected_array['CommercialRegisterNumber'] )
                    {
                        flag="selected";     
                    }
                    else
                    {
                        flag="";
                    } 
                 
                  html4+="<option value='"+fiter_CommercialRegisterNumber[key]+"' "+flag+">"+fiter_CommercialRegisterNumber[key]+"</option>";
                }
               }
               //Append Date

               var fiter_DateOfNotice =DateOfNotice.filter(function(itm, i, DateOfNotice) {
                return i == DateOfNotice.indexOf(itm);
                });
                fiter_DateOfNotice=fiter_DateOfNotice.sort();
                for(key in fiter_DateOfNotice)
                {
                  if(fiter_DateOfNotice[key]){
                    var flag="";
                    if(fiter_DateOfNotice[key]==selected_array['dateofnotice'] )
                    {
                        flag="selected";     company_name
                    }
                    else
                    {
                        flag="";
                    } 
                
                 
                  html5+="<option value='"+fiter_DateOfNotice[key]+"' "+flag+">"+fiter_DateOfNotice[key]+"</option>";
                }
               }
             
            

               //append each element
                document.getElementById('residence').innerHTML=html;
                document.getElementById('company_name').innerHTML=html1;
                document.getElementById('local_court').innerHTML=html2;
                document.getElementById('file_number').innerHTML=html3;
                document.getElementById('CommercialRegisterNumber').innerHTML=html4;
                document.getElementById('dateofnotice').innerHTML=html5;
                var self=this;
         
                //remove company name
                jQuery('#adv_search_item_company').click(function(){
                    selected_array['company_name'] ='';
                    jQuery('#adv_search_item_company_content').remove();
                    self.cross_advance_search(new_user_id);
                  });
                   //remove company name
                jQuery('#adv_search_item_resi').click(function(){
                    selected_array['residence'] ='';
                    jQuery('#adv_search_item_resi_content').remove();
                    self.cross_advance_search(new_user_id);
                  });
                   //remove company name
                jQuery('#adv_search_item_lc').click(function(){
                    selected_array['local_court'] ='';
                    jQuery('#adv_search_item_lc_content').remove();
                    self.cross_advance_search(new_user_id);
                  });
                   //remove company name
                jQuery('#adv_search_item_fl').click(function(){
                    selected_array['file_number'] ='';
                    jQuery('#adv_search_item_fl_content').remove();
                    self.cross_advance_search(new_user_id);
                  });
                   //remove company name
                jQuery('#adv_search_item_crn').click(function(){
                    selected_array['CommercialRegisterNumber'] ='';
                    jQuery('#adv_search_item_crn_content').remove();
                    self.cross_advance_search(new_user_id);
                
                  });
                   //remove company name
                jQuery('#adv_search_item_date').click(function(){
                    selected_array['dateofnotice'] ='';
                    jQuery('#adv_search_item_date_content').remove();
                    self.cross_advance_search(new_user_id);
                  });

                  // company section
                    jQuery("#company_name").select2({
                        placeholder: "Unternehmen auswählen",
                        allowClear: true,
                        closeOnSelect : false,
                        allowHtml: true,
               
                    }); 
                 
                  
                    jQuery('#company_name').on('change', function(e) {
                        if (e.handled !== true) {
                            e.handled = true;
                            var data = jQuery("#company_name option:selected").text();
                 
                            if(data.length >15 )
                            {
                      
                                jQuery('.company_search_wrapper .select2-selection__rendered').css('flex-direction','row-reverse');
                            }
                            else
                            {
                            
                                jQuery('.company_search_wrapper .select2-selection__rendered ').css('flex-direction','row');   
                            }
                            if(data.length > 0)
                            {
                               selected_array['company_name'] =data;
                             

                              self.operate_advance_search_by_change_ele(new_user_id);
                              return;
                            }
                            else
                            {
                                jQuery('#adv_search_item_company_content').remove();
                                selected_array['company_name'] ="";
                         
                                self.operateAdvanceSearch(new_user_id) ;
                              return;
                            }
                            return;
                        }
                      
                         
                      });
                    //localcourt section
                    jQuery("#local_court").select2({
                        placeholder: "Amtsgericht wählen",
                        allowClear: true,
                        closeOnSelect : false,
                        allowHtml: true,
                
                    }); 
                    jQuery('#local_court').on('change', function(e) {
                        if (e.handled !== true) {
                            e.handled = true;
                            var data = jQuery("#local_court option:selected").text();
                 
                            if(data.length >15 )
                            {
                                jQuery('.residence_search_wrapper .select2-selection__rendered ').css('flex-direction','row-reverse');
                            }
                            else
                            {
                                jQuery('.residence_search_wrapper .select2-selection__rendered ').css('flex-direction','row');   
                            }
                            if(data.length > 0)
                            {
                                selected_array['local_court'] =data;
                         
                                self.operate_advance_search_by_change_ele(new_user_id);
                                return;
                            }
                            else
                            {
                               jQuery('#adv_search_item_lc_content').remove();
                               selected_array['local_court'] ="";
                               self.operateAdvanceSearch(new_user_id) 
                               return;
                            }
                            return;
                        }
                   
                      }); 
                     //Residence
                     jQuery("#residence").select2({
                        placeholder: "Wählen Sie Wohnort",
                        allowClear: true,
                        closeOnSelect : false,
                        allowHtml: true,
           
                    }); 
                    jQuery('#residence').on('change', function(e) {
                        if (e.handled !== true) {
                            e.handled = true;
                            var data = jQuery("#residence option:selected").text();
          
                            if(data.length >15 )
                            {
                                jQuery('.district_court_search_wrapper .select2-selection__rendered ').css('flex-direction','row-reverse');
                            }
                            else
                            {
                                jQuery('.district_court_search_wrapper .select2-selection__rendered ').css('flex-direction','row');   
                            }
                            if(data.length > 0)
                            {
                                selected_array['residence'] =data;
                               self.operate_advance_search_by_change_ele(new_user_id);
                               return;
                               
                            }
                            else
                            {
                             jQuery('#adv_search_item_resi_content').remove();
                              selected_array['residence'] ="";
                               self.operateAdvanceSearch(new_user_id) 
                               return;
                            }
                            return;
                        }
                    
                      });
                   //FileNumber
                   jQuery("#file_number").select2({
    
                        placeholder: "Wählen Sie Dateinummer",
                        allowClear: true,
                        closeOnSelect : false,
                        allowHtml: true,

                    }); 
                    jQuery('#file_number').on('change', function(e) {
                        if (e.handled !== true) {
                            e.handled = true;
                            var data = jQuery("#file_number option:selected").text();
           
                            if(data.length >15 )
                            {
                                jQuery('.file_search_wrapper .select2-selection__rendered ').css('flex-direction','row-reverse');
                            }
                            else
                            {
                                jQuery('.file_search_wrapper .select2-selection__rendered ').css('flex-direction','row');   
                            }
                            if(data.length > 0)
                            {
                                selected_array['file_number'] =data;
                               self.operate_advance_search_by_change_ele(new_user_id);
                               return;
                            }
                            else
                            {
                                jQuery('#adv_search_item_fl_content').remove();
                                selected_array['file_number'] ="";
                               self.operateAdvanceSearch(new_user_id) 
                               return;
                            }
                            return;
                        }
                    
                    });
                    //CRN
                    jQuery("#CommercialRegisterNumber").select2({
                    placeholder: "CRN auswählen",
                    allowClear: true,
                    closeOnSelect : false,
                    allowHtml: true,
                
                    }); 
                    jQuery('#CommercialRegisterNumber').on('change', function(e) {
                        if (e.handled !== true) {
                            e.handled = true;
                            var data = jQuery("#CommercialRegisterNumber option:selected").text();
            
                            if(data.length >15 )
                            {
                                jQuery('.crn_search_wrapper .select2-selection__rendered ').css('flex-direction','row-reverse');
                            }
                            else
                            {
                                jQuery('.crn_search_wrapper .select2-selection__rendered ').css('flex-direction','row');   
                            }
                            if(data.length > 0)
                            {
                                selected_array['CommercialRegisterNumber'] =data;
                               self.operate_advance_search_by_change_ele(new_user_id);
                               return;
                            }
                            else
                            {
                                jQuery('#adv_search_item_crn_content').remove();
                              selected_array['CommercialRegisterNumber'] ="";  
                              self.operateAdvanceSearch(new_user_id); 
                              return;
                            }
                            return;
                        }
                   
                    });

                       //date
                       jQuery("#dateofnotice").select2({
                        placeholder: "Datum auswählen",
                        allowClear: true,
                        closeOnSelect : false,
                        allowHtml: true,
                     
                        }); 
                        jQuery('#dateofnotice').on('change', function(e) {
                            if (e.handled !== true) {
                                e.handled = true;
                                var data = jQuery("#dateofnotice option:selected").text();
                 
                                 if(data.length >15 )
                                {
                                    jQuery('.date_wrapper .select2-selection__rendered ').css('flex-direction','row-reverse');
                                }
                                else
                                {
                                    jQuery('.date_wrapper .select2-selection__rendered ').css('flex-direction','row');   
                                }
                                if(data.length > 0)
                                {
                                  
                                    selected_array['dateofnotice'] =data;
                     
                                    self.operate_advance_search_by_change_ele(new_user_id);
                                    return;
                                }
                                else
                                {
                                    jQuery('#adv_search_item_date_content').remove();
                                    selected_array['dateofnotice'] =data;
                                    self.operateAdvanceSearch(new_user_id);
                                    return; 
                                }
                                return;
                            }
                       
                        });
                    

                     

            }

      
      
        //reload search table
         reload_search_table =(results, user_id)=>{
             console.log("filter result here ==",results);
            const noResults = document.querySelector('#search_results_empty');
            const withResults = document.querySelector('#search_results_main');
            const tb_cus_container = document.querySelector('.tb_cus_container');
            const search_results = document.querySelector('#search_results')
            const advanced_search_field_warpper=document.querySelector('.advanced_search_field_warpper');
            search_results.innerHTML = '';
        
            if (results.length <= 0) {
                if (!withResults.classList.contains('hidden')) {
                    withResults.classList.add('hidden');
                }
                noResults.classList.remove('hidden');
                advanced_search_field_warpper.style.display="none";
                withResults.style.display="none";
                // tb_cus_container.style.display="none";
            } else {
                if (!noResults.classList.contains('hidden')) {
                    noResults.classList.add('hidden');
                }
                withResults.classList.remove('hidden');
                withResults.style.display="block";
                // tb_cus_container.style.display="block";

            }
            if(selected_array['residence']!="" || selected_array['company_name']!=""  || selected_array['dateofnotice']!=""  || selected_array['local_court']!=""  || selected_array['file_number']!=""  || selected_array['CommercialRegisterNumber']!="")
            {
                advanced_search_field_warpper.style.display="block";
            }
            // if(ele.trim().length > 0)
            // {
            //     advanced_search_field_warpper.style.display="block";  
            // }
     
            results.forEach(result => {
                if(result!=null){

                const tr= document.createElement('tr');
                var noticeDate2 = new Date(result.DateOfNotice);
                var dd = String(noticeDate2.getDate()).padStart(2, '0');
                var mm = String(noticeDate2.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = noticeDate2.getFullYear();
    
                var changeDate = dd + '-' + mm + '-' + yyyy;
                // MAIN LINK
                let mainBtn = null;
            
                // if (!user_id) {
                //     mainBtn = document.createElement('button');
                //     mainBtn.type = 'button';
                //     mainBtn.classList.add('search-no-login');
                // } else {
                //     mainBtn = document.createElement('a');
                //     mainBtn.href = '/search/' + result.NameOfDebtor
                // }
                //
                //SET ATTRIBUTE FOR TABLE ROW
                tr.setAttribute("data_id",result.Id);

                // COMPANY COLUMN
                const company = document.createElement('td');
                const companyName = document.createElement('p');
                companyName.textContent = result.NameOfDebtor
              

                if (!user_id) {
                    company.appendChild(companyName)
                    companyName.classList.add('search-no-login');
                } else {
                    mainBtn = document.createElement('a');
                    mainBtn.classList.add("go_search_page");
                    mainBtn.href = '/'+window.location.href.trim().split('/')[3].trim()+'/search/' + result.NameOfDebtor+'dataid'+result.Id;
                    mainBtn.appendChild(companyName);
                    company.appendChild(mainBtn);
                }
                 tr.appendChild(company);

                // CITY COLUMN
                const city = document.createElement('td');
         
                if (!user_id) {
                    city.textContent = result.LocalCourt;
                    city.classList.add('search-no-login');
                } else {
                    mainBtn = document.createElement('a');
                    mainBtn.classList.add("go_search_page");
                    mainBtn.href = '/'+window.location.href.trim().split('/')[3].trim()+'/search/' + result.NameOfDebtor+'dataid'+result.Id;
                    mainBtn.textContent=result.LocalCourt;
                    city.appendChild(mainBtn);
                }
                tr.appendChild(city)
                // DATE COLUMN
                const date = document.createElement('td');
                if (!user_id) {
                    date.textContent = changeDate;
                    date.classList.add('search-no-login');
                } else {
                    mainBtn = document.createElement('a');
                    mainBtn.classList.add("go_search_page");
                    mainBtn.href = '/'+window.location.href.trim().split('/')[3].trim()+'/search/' + result.NameOfDebtor+'dataid'+result.Id;
                    mainBtn.textContent=changeDate;
                    date.appendChild(mainBtn)
                }
                tr.appendChild(date)
                // NOTICES COLUMN
                const notices = document.createElement('td');
   
                if (!user_id) {
                    notices.textContent = result.notices;
                    notices.classList.add('search-no-login');
                } else {
                    mainBtn = document.createElement('a');
                    mainBtn.classList.add("go_search_page");
                    mainBtn.href = '/'+window.location.href.trim().split('/')[3].trim()+'/search/' + result.NameOfDebtor+'dataid'+result.Id;
                    mainBtn.textContent=result.notices;
                    notices.appendChild(mainBtn); 
                }
                tr.appendChild(notices)
                //Add watchlist Heart
                const add_watchlist = document.createElement('td');
                if (!user_id) {
                    add_watchlist.innerHTML = '<i class="fa fa-heart-o"></i>'
                    // mainBtn = document.createElement('button');
                    // mainBtn.type = 'button';
                    add_watchlist.classList.add('search-no-login');
                } else {
                    mainBtn = document.createElement('button');
                    mainBtn.classList.add("add_to_watchlist");
                    mainBtn.dataset.id=result.NameOfDebtor;
                    mainBtn.setAttribute("data_row_id",result.Id);
                    mainBtn.innerHTML = '<i class="fa fa-heart-o"></i>';
                    add_watchlist.appendChild(mainBtn);


                }
                tr.appendChild(add_watchlist)
                // CRAETE FULL INSTANCE
                // tr.appendChild(mainBtn);
                search_results.appendChild(tr);
            } 
            });
            numberOfItems = jQuery("#search_results  tr").length;
            limitPerPage =20;
           // Total pages rounded upwards
            totalPages = Math.ceil(numberOfItems / limitPerPage);
           // Number of buttons at the top, not counting prev/next,
           // but including the dotted buttons.
           // Must be at least 5:
            paginationSize = 5; 
              // Include the prev/next buttons:
            jQuery(".pagination").append(
            jQuery("<li>").addClass("page-item").attr({ id: "previous-page" }).append(
                  jQuery("<a>").addClass("page-link").attr({
                     href: "javascript:void(0)"}).text("Prev")
            ),
            jQuery("<li>").addClass("page-item").attr({ id: "next-page" }).append(
                  jQuery("<a>").addClass("page-link").attr({
                     href: "javascript:void(0)"}).text("Next")
            )
            );
            // Show the page links
            jQuery("#search_results").show();
            showPage(1);
            if(Object.keys(results).length === 0)
            {
                const paginationDiv=document.querySelector('.pagination');
                 paginationDiv.innerHTML="";
            }
            //store resultset
            sessionStorage.setItem('resultset_obj', JSON.stringify(search_result_set));
            //store advance search data
            sessionStorage.setItem('adv_search_obj', JSON.stringify(selected_array));
            //store main search data
            sessionStorage.setItem('search_data', jQuery('#search').val());
        
            // jQuery('.go_search_page').click(function(){
            //       //store resultset
            // sessionStorage.setItem('resultset_obj', JSON.stringify(search_result_set));
            // //store advance search data
            // sessionStorage.setItem('adv_search_obj', JSON.stringify(selected_array));
            // //store main search data
            // sessionStorage.setItem('search_data', jQuery('#search').val());
             
            // });
             // check element which has added in watch list 

             if(user_id)
             {
                 const data = new FormData();
                 data.append( 'action', 'comp_checkWatchlist' );
                
                 const request = {
                     method: 'POST',
                     credentials: 'same-origin',
                     body: data,
                 }
                 fetch('/'+window.location.href.trim().split('/')[3].trim()+'/wp-admin/admin-ajax.php', request)
                    .then((response) => {
                        return response.json();
                     })
                     .then(response => {
                         if (response && response.code === 200) {
                            var tr_length= jQuery('#search_results tr').length;
                           
                            var response=response.data;
                            
                            if(Object.keys(response).length > 0 && tr_length >0)
                            {
                            
                             for (var key in response) {
                                 if (response.hasOwnProperty(key)) {
                                     var watchlist_data=response[key];
                                     console.log("watchlist_data.Id ",watchlist_data.data_id);
                                     for(var i=0; i<tr_length;i++)
                                     {
                                         var tr_id=document.querySelectorAll('#search_results tr')[i].getAttribute('data_id');
                                    
                                         if(watchlist_data.data_id == tr_id)
                                         {
                                          
                                            
                                 
     
                                             var td_obj=document.querySelectorAll('#search_results tr')[i].querySelectorAll('td')[4].querySelector('button');
                                             td_obj.innerHTML="<i class='fa fa-heart'></i>";
                                             td_obj.classList.add('remove_watchlist');
//                                             td_obj.classList.add('data-added');
                                             td_obj.classList.remove('add_to_watchlist');
                                         } 
 
                                     }
         
                                 }
                             }
                                
                            }
 
                         }
                  });
             }
             
               
            

         }
         


        openSingInModal = _ => {
            const signInModal = document.querySelector('#signin_modal');
            const signInModalOverlay = document.querySelector('#signup_modal_overlay');
            const signInModalData = document.querySelector('#signup_modal_data');

            signInModal.classList.remove('hidden');

            signInModalOverlay.classList.remove('ease-in', 'duration-200', 'opacity-0');
            signInModalOverlay.classList.add('ease-out', 'duration-300', 'opacity-100');

            signInModalData.classList.remove('ease-in', 'duration-200', 'opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95');
            signInModalData.classList.add('ease-out', 'duration-300', 'opacity-100', 'translate-y-0', 'sm:scale-100');

            const closeModal = document.querySelector('.close_singin_modal');
            closeModal.addEventListener('click', _ => this.closeSingInModal())
        }

        closeSingInModal = _ => {
            const signInModal = document.querySelector('#signin_modal');
            const signInModalOverlay = document.querySelector('#signup_modal_overlay');
            const signInModalData = document.querySelector('#signup_modal_data');

            signInModal.classList.add('hidden');

            signInModalOverlay.classList.remove('ease-out', 'duration-300', 'opacity-100');
            signInModalOverlay.classList.add('ease-in', 'duration-200', 'opacity-0');

            signInModalData.classList.remove('ease-out', 'duration-300', 'opacinew_user_idty-100', 'translate-y-0', 'sm:scale-100');
            signInModalData.classList.add('ease-in', 'duration-200', 'opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95');

            const closeModal = document.querySelector('.close_singin_modal');
            closeModal.removeEventListener('click', _ => this.closeSingInModal())
        }

        createButtonElement = name => {
            const companyBtn = document.createElement('button');
            companyBtn.classList.add('inline-flex', 'items-center', 'p-1.5', 'border', 'border-gray', 'rounded-full', 'shadow-sm', 'cursor-pointer')
            companyBtn.type = 'button';

            const img = document.createElement('img');
            img.classList.add('h-5', 'w-5');
            img.src = this.#template + '/assets/images/route.svg';
            img.alt = name;

            companyBtn.appendChild(img);

            return companyBtn
        }

         mainSearch() {
     
             const records = document.querySelectorAll('.search-result');
             this.operateRecord(records[0].dataset.id);
             console.log("mydata_id",records[0].dataset.id);
             records.forEach(
                 record => 
                     record.addEventListener('click', _ => this.operateRecord(record.dataset.id))
                    
             )
         }
     


         operateRecord(id) {
         
             const resultDescription = document.querySelector('#result_description')
             // const data = new FormData();
    
             // data.append( 'action', 'description_search_ajax' );
             // data.append( 'id', id);
    
             fetch('/'+window.location.href.trim().split('/')[3].trim()+'/wp-json/insolvenz-monitor/v1/description?id=' + id, {
                 method: 'GET',
                 credentials: 'same-origin',
             })
                 .then(response => response.json())
                 .then(data => {
                
                     resultDescription.innerHTML = '<p>' + data.FullTextOfTheNotice.replace(/\n/g, "<br />").replaceAll('|','') + '</p>'
                 });
   
         }

        watchlistListiner = _ => {
            const addWatchlist = document.querySelector('.add-watchlist')

            if (addWatchlist && typeof addWatchlist !== 'undefined') {
                let name = null;
                if ("dataset" in addWatchlist && "name" in addWatchlist) {
                    name = addWatchlist.dataset.name
                } else {
                    const search = document.querySelector('#search');
                    name = search.value.trim;
                }
                addWatchlist.addEventListener('click', _ => this.addToWatchlist(name))
            }
        }

        deleteWatchlistListiner = _ => {
             var myself=this;
            // const deleteWatchlist = document.querySelectorAll('.delete-watchlist')
            // if (typeof deleteWatchlist !== 'undefined' && deleteWatchlist.length > 0) {
            //     // const id = deleteWatchlist[0].dataset.id

            //     // deleteWatchlist[0].addEventListener('click', _ => this.openRemoveModal(id));

            //     deleteWatchlist.forEach(
            //         dtlw => 
            //         dtlw.addEventListener('click', _ => this.openRemoveModal(dtlw.dataset.id))
            //     );
                  
            // }

             
            jQuery(document).on('click','.delete-watchlist',function(){
                var data_id=jQuery(this).attr('data-id');
            
                // alert("hello");
                myself.openRemoveModal(data_id);
            
            });
          
        }




        addToWatchlist = name => {
            var check_watchlistBtn=document.querySelector('.add-watchlist');
            if(check_watchlistBtn)
            {
               var data_id= check_watchlistBtn.getAttribute('data_id');
            
           
            if (!name) {
                const search = document.querySelector('#search');
                if(search)
                {
                    name = search.value.trim();
                }
               
            }      
            const data = new FormData();
            data.append( 'action', 'add_watchlist' );
            data.append( 'name', name);
           
             data.append( 'data_id',data_id);
            const request = {
                method: 'POST',
                credentials: 'same-origin',
                body: data,
            }
            
            
            fetch('/'+window.location.href.trim().split('/')[3].trim()+'/wp-admin/admin-ajax.php', request)
                .then(response => response.json())
                .then(response=> {
                    if (response && response.code === 200) {

                     jQuery('.plan-active').addClass('edit-watchlist-link'); 
                     jQuery('.plan-active').removeClass('add-watchlist'); 
                     jQuery('.plan-active').html('Merkliste bearbeiten <i class="fa fa-heart b-icon"></i>');
                 
                    
                     Swal.fire(
                        'Glückwünsche!',
                        'Artikel erfolgreich hinzugefügt!',
                        'success'
                      ) 
                   // window.location ='/watchlist';
                    }
                });
            }  
        }

        openRemoveModal = id => {
            console.log("deleted",id);
            const deleteWatchlist = document.querySelectorAll('#accept_remove_btn');
            const cancelRemoveModal = document.querySelectorAll('#cancel_remove_btn');

            const removeModal = document.querySelector('#remove_modal');
            const removeModalOverlay = document.querySelector('#remove_modal_overlay');
            const removeModalData = document.querySelector('#remove_modal_data');

            removeModal.classList.remove('hidden');

            removeModalOverlay.classList.remove('ease-in', 'duration-200', 'opacity-0');
            removeModalOverlay.classList.add('ease-out', 'duration-300', 'opacity-100');

            removeModalData.classList.remove('ease-in', 'duration-200', 'opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95');
            removeModalData.classList.add('ease-out', 'duration-300', 'opacity-100', 'translate-y-0', 'sm:scale-100');

            console.log("-=-=-=-", deleteWatchlist)
            if (typeof deleteWatchlist !== 'undefined' && deleteWatchlist.length > 0) {

                deleteWatchlist[0].setAttribute('data-id',id);
                
                // deleteWatchlist[0].addEventListener('click', _ => this.deleteFromWatchlist(id),true);
                cancelRemoveModal[0].addEventListener('click', _ => this.closeRemoveModal(id),true);
                
            }
        }

        closeRemoveModal = id => {
            console.log("closed",id);
            const deleteWatchlist = document.querySelectorAll('#accept_remove_btn');
            const cancelRemoveModal = document.querySelectorAll('#cancel_remove_btn');
      
            const removeModal = document.querySelector('#remove_modal');
            const removeModalOverlay = document.querySelector('#remove_modal_overlay');
            const removeModalData = document.querySelector('#remove_modal_data');

            removeModal.classList.add('hidden');

            removeModalOverlay.classList.remove('ease-out', 'duration-300', 'opacity-100');
            removeModalOverlay.classList.add('ease-in', 'duration-200', 'opacity-0');

            removeModalData.classList.remove('ease-out', 'duration-300', 'opacity-100', 'translate-y-0', 'sm:scale-100');
            removeModalData.classList.add('ease-in', 'duration-200', 'opacity-0', 'translate-y-4', 'sm:translate-y-0', 'sm:scale-95');
            // deleteWatchlist[0].removeEventListener('click', _ => this.deleteFromWatchlist(id),true);
            cancelRemoveModal[0].removeEventListener('click', _ => this.closeRemoveModal(id),true);
          
          
        }
        
        deleteFromWatchlist = id => {
           

            console.log("my deleted data",id);
            const data = new FormData();
    
            // data.append( 'action', 'del_watchlist' );
            // data.append( 'id', id);
  


            // const request = {
            //     method: 'POST',
            //     credentials: 'same-origin',
            //     body: data,
            // }
            // fetch('/wp-admin/admin-ajax.php', request)
            //     .then(response => response.json())
            //     .then(response => {
            //         if (response && response.code === 200) {
            //             window.location.reload();
            //         }
            //     });
               
        }

        mobileMenu = _ => {
            const openMenu = document.querySelector('.open-mobile-menu');
            const closeMenu = document.querySelector('.close-mobile-menu');
            if(openMenu)
            {
                openMenu.addEventListener('click', _ => this.openMenu());
            }
            if(closeMenu)
            {
                closeMenu.addEventListener('click', _ => this.closeMenu());
            }
         
        }

        openMenu = _ => {
            const mobileMenu = document.querySelector('#mobile_menu');

            mobileMenu.classList.remove('hidden');
            mobileMenu.classList.remove('duration-100', 'ease-in', 'opacity-0', 'scale-95');
            mobileMenu.classList.add('duration-200', 'ease-out', 'opacity-100', 'scale-100');
        }

        closeMenu = _ => {
            const mobileMenu = document.querySelector('#mobile_menu');
            mobileMenu.classList.remove('duration-200', 'ease-out', 'opacity-100', 'scale-100');
            mobileMenu.classList.add('duration-100', 'ease-in', 'opacity-0', 'scale-95');
            mobileMenu.classList.add('hidden');
        }

    }

    const unicatScript = new InsolvenzMonitorCore();



    if (typeof homepage_search !== 'undefined') {
        unicatScript.frontpageSearch(homepage_search.template, parseInt(homepage_search.user_id));
        unicatScript.deleteWatchlistListiner();
       
    } else if (typeof main_search !== 'undefined') {
       
        unicatScript.mainSearch();
    }

    unicatScript.watchlistListiner()

    unicatScript.mobileMenu()
   
})()


 // Returns an array of maxLength (or less) page numbers
// where a 0 in the returned array denotes a gap in the series.
// Parameters:
//   totalPages:     total number of pages
//   page:           current page
//   maxLength:      maximum size of returned array
function getPageList(totalPages, page, maxLength) {
    if (maxLength < 3) throw "maxLength must be at least 5";
 
    function range(start, end) {
        return Array.from(Array(end - start + 1), (_, i) => i + start); 
    }
 
    var sideWidth = maxLength < 9 ? 1 : 2;
    var leftWidth = (maxLength - sideWidth*2 - 3) >> 1;
    var rightWidth = (maxLength - sideWidth*2 - 2) >> 1;
    if (totalPages <= maxLength) {
        // no breaks in list
        return range(1, totalPages);
    }
    if (page <= maxLength - sideWidth - 1 - rightWidth) {
        // no break on left of page
        return range(1, maxLength - sideWidth - 1)
            .concat(0, range(totalPages - sideWidth + 1, totalPages));
    }
    if (page >= totalPages - sideWidth - 1 - rightWidth) {
        // no break on right of page
        return range(1, sideWidth)
            .concat(0, range(totalPages - sideWidth - 1 - rightWidth - leftWidth, totalPages));
    }
    // Breaks on both sides
    return range(1, sideWidth)
        .concat(0, range(page - leftWidth, page + rightWidth),
                0, range(totalPages - sideWidth + 1, totalPages));
 }
 
 function showPage(whichPage) {
    if (whichPage < 1 || whichPage > totalPages) return false;
    currentPage = whichPage;
    jQuery("#search_results  tr").hide()
        .slice((currentPage-1) * limitPerPage, 
                currentPage * limitPerPage).show();
    // Replace the navigation items (not prev/next):            
    jQuery(".pagination li").slice(1, -1).remove();
    getPageList(totalPages, currentPage, paginationSize).forEach( item => {
        jQuery("<li>").addClass("page-item")
                 .addClass(item ? "current-page" : "disabled")
                 .toggleClass("active", item === currentPage).append(
            jQuery("<a>").addClass("page-link").attr({
                href: "javascript:void(0)"}).text(item || "...")
        ).insertBefore("#next-page");
    });
    // Disable prev/next when at first/last page:
    jQuery("#previous-page").toggleClass("disabled", currentPage === 1);
    jQuery("#next-page").toggleClass("disabled", currentPage === totalPages);
    return true;
 }


    
    // Use event delegation, as these items are recreated later    
    jQuery(document).on("click", ".pagination li.current-page:not(.active)", function () {
       return showPage(+jQuery(this).text());
   });
   jQuery(document).on('click','#next-page',function(){
      return showPage(currentPage+1);
   });
    jQuery(document).on('click','#previous-page',function(){
    return showPage(currentPage-1);
    });

    jQuery('.comp_list').click(function () {
        jQuery('.comp_list').removeClass('tab-active'); 
        jQuery(this).addClass('tab-active'); 
     }); 


jQuery(document).ready(function(){
    if(jQuery('.advanced_search_field_warpper').css('display') == 'none')
    {
       jQuery('.searchBarSection').css("margin-bottom","10rem");
    }
    if(window.location.href.trim().split('/')[3]=="watchlist")
    {
      document.querySelectorAll('.cust_tabs a')[1].style.color="#fff";
      document.querySelectorAll('.cust_tabs a')[1].style.backgroundColor="#7571ff";  
      document.querySelectorAll('.cust_tabs a')[0].style.color="#777E90";
      document.querySelectorAll('.cust_tabs a')[0].style.backgroundColor="#fff"; 
    }
    if(window.location.href.trim().split('/')[3]=="suche")
    {
      document.querySelectorAll('.cust_tabs a')[0].style.color="#fff";
      document.querySelectorAll('.cust_tabs a')[0].style.backgroundColor="#7571ff";  
      document.querySelectorAll('.cust_tabs a')[1].style.color="#777E90";
      document.querySelectorAll('.cust_tabs a')[1].style.backgroundColor="#fff";
    }
  
});


//Add to watchlist

jQuery(document).on('click','.add_to_watchlist',function(){
    
    jQuery('.common_container').css('pointer-events','none');
    var heartbtn=jQuery(this);
    var data_id=heartbtn.attr('data-id');
    var data_row_id=heartbtn.attr('data_row_id');
    const data = new FormData();
    data.append( 'action', 'unicat_user_watchlists1' );   
    const request = {
        method: 'POST',
        credentials: 'same-origin',
        body: data,
    }
     fetch('/'+window.location.href.trim().split('/')[3].trim()+'/wp-admin/admin-ajax.php', request)
    .then(response => response.json())
    .then(response=>{
          if (response && response.code === 200) {
            console.log("plan_fail=",response) ; 
        
            if(response.data === 0)
             {
              
                Swal.fire(
                  'Sorry!',
                  'Aktualisieren Sie Ihren Plan, danke!',
                  'error'
                )      
               console.log("plan_fail= ", response) ; 
               jQuery('.common_container').css('pointer-events','');
             }
             else
             {
              
                Swal.fire(
                  'Glückwünsche!',
                  'Artikel erfolgreich hinzugefügt!',
                  'success'
                ) 
                heartbtn.html('<i class="fa fa-heart"></i>');
                jQuery('.common_container').css('pointer-events',''); 
                console.log("plan_tester=",response) ; 
              
                const data = new FormData();
                data.append( 'action', 'add_watchlist' );
                data.append( 'name', data_id); 
                data.append( 'data_id',  data_row_id);    
                const request = {
                    method: 'POST',
                    credentials: 'same-origin',
                    body: data,
                }
                fetch('/'+window.location.href.trim().split('/')[3].trim()+'/wp-admin/admin-ajax.php', request)
                    .then(response => response.json())
                    .then(response=> {
                        if (response && response.code === 200) {
                           
                            heartbtn.addClass('remove_watchlist');
//                            heartbtn.addClass('data-added');
                            heartbtn.removeClass('add_to_watchlist');

                        }
                    });  
             }
          }
        

    });
    

});

//remove watchlist
jQuery(document).on('click','.remove_watchlist',function(){
    var heartbtn=jQuery(this);
    jQuery('.common_container').css('pointer-events','none');
      Swal.fire(
      'Deleted!',
      'Artikel erfolgreich gelöscht!',
      'success'
      ) 
    heartbtn.html('<i class="fa fa-heart-o"></i>');
    jQuery('.common_container').css('pointer-events','');
  
    var data_id=heartbtn.attr('data-id');
    var data_row_id=heartbtn.attr('data_row_id');
    const data = new FormData();

    data.append( 'action', 'del_watchlistbyValue' );
    data.append( 'name',  data_id);
    data.append( 'data_id',  data_row_id);

    const request = {
        method: 'POST',
        credentials: 'same-origin',
        body: data,
    }
    fetch('/'+window.location.href.trim().split('/')[3].trim()+'/wp-admin/admin-ajax.php', request)
        .then(response => response.json())
        .then(response => {
            if (response && response.code === 200) {
            
                heartbtn.removeClass('remove_watchlist');
                heartbtn.addClass('add_to_watchlist');

                // window.location.reload();
            }
        });    
    
});






// search content page



// jQuery(document).on('click','.edit-watchlist-link',function(){
//     window.location='/watchlist';
// });

//delete functionality 
var myself=this;
jQuery(document).on('click','#accept_remove_btn',function(){
    var data_id=jQuery(this).attr('data-id');
   // alert(data_id);
     const data = new FormData(); 
     data.append( 'action', 'del_watchlist' );
     data.append( 'id', data_id);
     const request = {
         method: 'POST',
         credentials: 'same-origin',
         body: data,
     }
     fetch('/'+window.location.href.trim().split('/')[3].trim()+'/wp-admin/admin-ajax.php', request)
         .then(response => response.json())
         .then(response => {
             if (response && response.code === 200) {
                 window.location.reload();
             }
         });

});

//check watchlist already added

      const check_plan_active_class = document.querySelector('.plan-active');
              if(check_plan_active_class)
              {
                jQuery(document).on('click','.plan-active',function(){
                    if(jQuery(this).hasClass('edit-watchlist-link'))
                    {
                        
                       window.location='/'+window.location.href.trim().split('/')[3].trim()+'/watchlist';
                    }

                  
                });  



                console.log("plan active here");
                var flag="true";
                var data_id=jQuery('.plan-active').attr('data_id');
                  
                const data = new FormData();
                data.append( 'action', 'comp_checkWatchlist' );

                const request = {
                    method: 'POST',
                    credentials: 'same-origin',
                    body: data,
                }
                fetch('/'+window.location.href.trim().split('/')[3].trim()+'/wp-admin/admin-ajax.php', request)
                .then((response) => {
                    return response.json();
                })
                .then(response => {
                if (response && response.code === 200) {
                  
                      var response=response.data;   
                        if(Object.keys(response).length > 0 )
                        {
                            console.log("plan active here");
                         for (var key in response) {
                             if (response.hasOwnProperty(key)) {
                                 var watchlist_data=response[key];
                                  if(watchlist_data.data_id == data_id)
                                  {
                                  
                                       flag="false";
                                       check_plan_active_class.style.display="block";
                                       jQuery('.plan-active').html('Merkliste bearbeiten <i class="fa fa-heart b-icon"></i>');
                                       jQuery('.plan-active').addClass('edit-watchlist-link'); 
                                       jQuery('.plan-active').removeClass('add-watchlist'); 
                                      
                                  }
                             }

                           }
                          
                           if(flag=="true")
                           {
                       
                             check_plan_active_class.style.display="block";
                           } 
                        }
                        if(flag=="true")
                        {
                    
                            check_plan_active_class.style.display="block";
                        }

                }
                else
                {
                    check_plan_active_class.style.display="block";   
                }
                
                });
             
        }
  



      const check_plan_expired_class = document.querySelector('.plan-expired');
              if(check_plan_expired_class)
              {
                console.log("I an here");
                jQuery(document).on('click','.plan-expired',function(){
                    if(jQuery(this).hasClass('edit-watchlist-link')==false)
                    {
                        Swal.fire(
                            'Sorry!',
                            'Aktualisieren Sie Ihren Plan, danke!',
                            'error'
                          )  
                    }

                  
                });  
                  
                var flag="true";
                var data_id=jQuery('.plan-expired').attr('data_id');
                console.log("plan-expired",data_id);  
                const data = new FormData();
                data.append( 'action', 'comp_checkWatchlist' );

                const request = {
                    method: 'POST',
                    credentials: 'same-origin',
                    body: data,
                }
                fetch('/'+window.location.href.trim().split('/')[3].trim()+'/wp-admin/admin-ajax.php', request)
                .then((response) => {
                    return response.json();
                })
                .then(response => {
                if (response && response.code === 200) {
                      var response=response.data;   
                        if(Object.keys(response).length > 0 )
                        {
                         for (var key in response) {
                             if (response.hasOwnProperty(key)) {
                                 var watchlist_data=response[key];
                                  if(watchlist_data.data_id == data_id)
                                  {
                                       flag="false";
                                       check_plan_expired_class.style.display="block";
                                       jQuery('.plan-expired').addClass('edit-watchlist-link'); 
                                      
                                       jQuery('.plan-expired').html('Merkliste bearbeiten <i class="fa fa-heart b-icon"></i>');
                                       
                                      
                                  }
                             }

                           }
                           if(flag=="true")
                           {
                             check_plan_expired_class.style.display="block";
                           } 
                        }
                        if(flag=="true")
                        {
                    
                            check_plan_expired_class.style.display="block";
                        }

                }
                else
                {
                    check_plan_expired_class.style.display="block";   
                }
                
                });
             
        }
   







//display search page description via data_id.
     
//    const records = document.querySelectorAll('.search-result');
//    if(records.length > 0 )
//    {
//        console.log("len",records.length);
//        operateRecord(records[0].dataset.id);
//        console.log("mydata_id",records[0].dataset.id);
//        
//        jQuery(document).on('click','.search-result',function(){
//            var data_id=jQuery(this).attr('data-id');
//            operateRecord(data_id);
//        });
//        
//
//    }
   




//function operateRecord(id) {
// 
//    const resultDescription = document.querySelector('#result_description')
//    // const data = new FormData();
//    // data.append( 'action', 'description_search_ajax' );
//    // data.append( 'id', id);
//
//    fetch('/wp-json/insolvenz-monitor/v1/description?id=' + id, {
//        method: 'GET',
//        credentials: 'same-origin',
//    })
//        .then(response => response.json())
//        .then(data => {
//        
//            resultDescription.innerHTML = '<p>' + data.FullTextOfTheNotice.replace(/\n/g, "<br />") + '</p>'
//        });
//
//}
    

                    
                    

