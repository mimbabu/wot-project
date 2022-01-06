$(document).ready(function() {
    $('[data-toggle="popover"]').popover({
      container: 'body',
      html: true,
      content: function () {
          return $(this).next('.popper-content').html();
      }
    });

    $('[data-toggle="popover"]').on('click', function (e) {
        $('[data-toggle="popover"]').not(this).popover('hide');
    });

    $('body').on('click', function (e) {
        //did not click a popover toggle or popover
        if ($(e.target).data('toggle') !== 'popover'
            && $(e.target).parents('.popover.in').length === 0) {
            $('[data-toggle="popover"]').popover('hide');
        }
    });

    $('#reason').select2({
        placeholder: "--Select a reason--",
        allowClear: true
    });

    $('#select_app').select2({
      placeholder: "--Select an App--",
      allowClear: true
    });

    $('#app_type').select2({
      placeholder: "--Select App Type--",
      allowClear: true
    });

    $('#select_app_version').select2({
      placeholder: "--Select App version--",
      allowClear: true
    });

    $('#ios_phone_model').select2({
      placeholder: "--Select Phone Model--",
      allowClear: true
    });

    $('#ios_version').select2({
      placeholder: "--Select iOS version--",
      allowClear: true
    });

    $('#ios_version_number').select2({
      placeholder: "--Select iOS version number--",
      allowClear: true
    });

    $('#reason').on('change', function (e) {
        let reason = $(this).find(":selected").val();
        if (reason != 'General'){
            $('#select_app').parent().removeClass('d-none');
        }else{
            $('#select_app').parent().addClass('d-none');
        }
        $('#select_app').val('');
        //Phone Model
        $('#android_phone_model').prop('required', false).parent().addClass('d-none');
        $('#ios_phone_model').prop('required', false).parent().addClass('d-none');
        $('#app_type').prop('required', false).parent().addClass('d-none');
        $('#select_app_version').prop('required', false).parent().addClass('d-none');



        //OS Version
        $('#android_os_version').prop('required', false).parent().addClass('d-none');
        $('#ios_version').prop('required', false).parent().addClass('d-none');
        $('#ios_version_number').prop('required', false).parent().addClass('d-none');
    })

    //App Name change event
    $('#select_app').on('change', function (e) {
        let selected_app = $(this).find(":selected").val();
        if(selected_app != undefined && selected_app != ''){
            let android_app_versions = $(this).find(":selected").data("android-app-versions");
            let ios_app_versions = $(this).find(":selected").data("ios-app-versions");

            let appTypeOptionHTML = '<option></option>';
            if(ios_app_versions != undefined && ios_app_versions != '')
                appTypeOptionHTML += '<option value="iOS">iOS</option>';
            if(android_app_versions != undefined && android_app_versions != '')
                appTypeOptionHTML += '<option value="Android">Android</option>';

            $('#app_type').html(appTypeOptionHTML).prop('required', false).parent().removeClass('d-none');

            $('#select_app_version').prop('required', false).parent().addClass('d-none');

            //Phone Model
            $('#android_phone_model').prop('required', false).parent().addClass('d-none');
            $('#ios_phone_model').prop('required', false).parent().addClass('d-none');

            //OS Version
            $('#android_os_version').prop('required', false).parent().addClass('d-none');
            $('#ios_version').prop('required', false).parent().addClass('d-none');
            $('#ios_version_number').prop('required', false).parent().addClass('d-none');
        }else{
            $('#app_type').prop('required', false).parent().addClass('d-none');
            $('#select_app_version').prop('required', false).parent().addClass('d-none');

            //Phone Model
            $('#android_phone_model').prop('required', false).parent().addClass('d-none');
            $('#ios_phone_model').prop('required', false).parent().addClass('d-none');

            //OS Version
            $('#android_os_version').prop('required', false).parent().addClass('d-none');
            $('#ios_version').prop('required', false).parent().addClass('d-none');
            $('#ios_version_number').prop('required', false).parent().addClass('d-none');
        }
    });

    //App Type change event
    $('#app_type').on('change', function (e) {
       let android_app_versions = $('#select_app').find(":selected").data("android-app-versions");
       let ios_app_versions = $('#select_app').find(":selected").data("ios-app-versions");

       let app_type = $(this).find(":selected").val();

       $('#ios_version_number').prop('required', false).parent().addClass('d-none');

       if(app_type == 'iOS'){
          generateAppVersions(ios_app_versions);

          //App Version
          $('#ios-app-version-help').removeClass('d-none');
          $('#android-app-version-help').addClass('d-none');

          //Phone Model
          $('#android_phone_model').prop('required', false).parent().addClass('d-none');
          $('#ios_phone_model').val('').prop('required', false).parent().removeClass('d-none');
          $('#ios_phone_model').trigger('change');

          //OS Version
          $('#android_os_version').prop('required', false).parent().addClass('d-none');
          $('#ios_version').val('').prop('required', false).parent().removeClass('d-none');
          $('#ios_version').trigger('change');
       }else if(app_type == 'Android'){
          generateAppVersions(android_app_versions);

          //App Version
          $('#ios-app-version-help').addClass('d-none');
          $('#android-app-version-help').removeClass('d-none');

          //Phone Model
          $('#android_phone_model').val('').prop('required', false).parent().removeClass('d-none');
          $('#ios_phone_model').prop('required', false).parent().addClass('d-none');

          //OS Version
          $('#android_os_version').val('').prop('required', false).parent().removeClass('d-none');
          $('#ios_version').prop('required', false).parent().addClass('d-none');
       }else{
          $('#select_app_version').prop('required', false).parent().addClass('d-none');

          //Phone Model
          $('#android_phone_model').prop('required', false).parent().addClass('d-none');
          $('#ios_phone_model').prop('required', false).parent().addClass('d-none');

          //OS Version
          $('#android_os_version').prop('required', false).parent().addClass('d-none');
          $('#ios_version').prop('required', false).parent().addClass('d-none');
       }
    });


    //iOS version change event
    $('#ios_version').on('change', function (e) {
      let ios_version_numbers = $('#ios_version').find(":selected").data("ios-version-numbers");
      let selected_ios_version = $(this).find(":selected").val();

      if(selected_ios_version != undefined && selected_ios_version != ''){
          generateIosVersionNumberOptions(ios_version_numbers);
          $('#ios_version_number').prop('required', false).parent().removeClass('d-none');
      }else{
          $('#ios_version_number').prop('required', false).parent().addClass('d-none');
      }
    });


});

function generateAppVersions(versions){
  versions = versions.toString().split(",");
  let count = 0;
  var appVerionOptionHtml = '<option></option>';
  for(let i = versions.length - 1; i >= 0; i--){
      if(count == 5) break;
      appVerionOptionHtml += '<option value="' + versions[i] + '">' + versions[i] + '</option>';
      count++;
  }
  $('#select_app_version').html(appVerionOptionHtml).prop('required', false).parent().removeClass('d-none');
}

function generateIosVersionNumberOptions(versions){
  versions = versions.toString().split(",");
  var optionHtml = '<option></option>';
  for(let i = versions.length - 1; i >= 0; i--){
      optionHtml += '<option value="' + versions[i] + '">' + versions[i] + '</option>';
  }
  $('#ios_version_number').html(optionHtml).prop('required', false).parent().removeClass('d-none');
}