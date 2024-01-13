var serverURL="http://localhost:3000";

//import category options
function fillcategory(){
    $.getJSON(`${serverURL}/product/fetch_all_categories`,function(data){
        // alert(JSON.stringify(data))
        data.category.map((item)=>{
            $('#categoryid').append($('<option>').text(item.categoryname).val(item.categoryid))
        })
        $('#categoryid').formSelect();
    });
}
    
//import subcategory options using categoryid
function fillsubcategory(cid,selected){
    $.getJSON(`${serverURL}/product/fetch_all_subcategories`,{'categoryid':cid},function(data){
        // alert(JSON.stringify(data))
        $('#subcategoryid').empty()
        $('#subcategoryid').append($('<option>').text('Choose your option'))
        data.subcategory.map((item)=>{
            $('#subcategoryid').append($('<option>').text(item.subcategoryname).val(item.subcategoryid))
        });
        if(selected!='')
            $('#subcategoryid').val(selected)
        
        $('#subcategoryid').formSelect();
    });
}

//import brand options using category id
function fillbrand(cid,selected){
        $.getJSON(`${serverURL}/product/fetch_all_brands`,{'categoryid':cid},function(data){
            // alert(JSON.stringify(data))
            $('#brandid').empty()
            $('#brandid').append($('<option>').text('Choose your option'))
            data.brand.map((item)=>{
                $('#brandid').append($('<option>').text(item.brandname).val(item.brandid))
            })
            if(selected!='')
                $('#brandid').val(selected)

            $('#brandid').formSelect();
        });
}

//on ready document
$(document).ready(function(){
    fillcategory()
});

//on change category
$('#categoryid').change(function(){
    fillsubcategory($('#categoryid').val(),'')
    fillbrand($('#categoryid').val(),'')
});
    
