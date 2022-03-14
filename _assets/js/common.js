(function ($) {
  'use strict';

  // PC/SP判定
  // スクロールイベント
  // リサイズイベント
  // スムーズスクロール

  /* ここから */

  const breakpoint = 640;
  const mql = window.matchMedia(`screen and (max-width: ${breakpoint}px)`); //、MediaQueryListの生成
  let deviceFlag = mql.matches ? 1 : 0; // 0 : PC ,  1 : SP

  // pagetop
  let timer = null;
  const $pageTop = $('#pagetop');
  $pageTop.hide();

  // スクロールイベント
  $(window).on('scroll touchmove', function () {

    // スクロール中か判定
    if (timer !== false) {
      clearTimeout(timer);
    }

    // スクロール量が100pxを超えたら、200ms後にフェードイン
    timer = setTimeout(function () {
      if ($(this).scrollTop() > 100) {
        $('#pagetop').fadeIn('normal');
      } else {
        $pageTop.fadeOut();
      }
    }, 200);

    const scrollHeight = $(document).height();
    const scrollPosition = $(window).height() + $(window).scrollTop();
    const footHeight = parseInt($('#footer').innerHeight());


    if (scrollHeight - scrollPosition <= footHeight - 20) {
      // 現在の下から位置が、フッターの高さの位置にはいったら(bottom20px分を引いて調整)
      $pageTop.css({
        'position': 'absolute',
        'bottom': footHeight,
      });
    } else {
      $pageTop.css({
        'position': 'fixed',
        'bottom': '20px'
      });
    }

  });


  // リサイズイベント
  const checkBreakPoint = function (mql) {
    deviceFlag = mql.matches ? 1 : 0; // 0 : PC ,  1 : SP
    // → PC
    if (deviceFlag === 0) {
      console.log('PC');
    } else {
      // →SP
      console.log('SP');
    }

    deviceFlag = mql.matches;
  }

  // ブレイクポイントの瞬間に発火
  mql.addListener(checkBreakPoint); //MediaQueryListのchangeイベントに登録

  // 初回チェック
  checkBreakPoint(mql);


  // スムーズスクロール
  // #で始まるアンカーをクリックした場合にスムーススクロール
  // $('a[href^="#"]').on('click', function () {
  //   const speed = 500;
  //   const href = $(this).attr('href');
  //   const target = $(href == '#' || href == '' ? 'html' : href);
  //   const position = target.offset().top;

  //   $('body,html').animate({
  //     scrollTop: position
  //   }, speed, 'swing');
  //   return false;
  // });



  // ハンバーガーメニュー
  $(".hamburger-btn__inner").on("click", function () {
    $(this).toggleClass('active');
    $('.header-sp-nav').toggleClass('active');
    // $(this).parents('.content-wrap').find('.all-mask').toggleClass('active');
    $('.all-mask').toggleClass('active');
    $("html").toggleClass("is-fixed");
  });


  // FVのスライダー
  $('.top-fv__wrap').slick({
    autoplay:true,
    autoplaySpeed:3000,
    slidesToShow:1,
    centerMode: true,
    variableWidth: true,
    // focusOnSelect:true,
    prevArrow: '<button class="slide-arrow prev-arrow"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button class="slide-arrow next-arrow"><i class="fas fa-chevron-right"></i></button>',
    dots:false,
  });

  // top-sec03のスライダー
  $('.top-sec03-contents__slider-wrap').slick({
    autoplay:true,
    autoplaySpeed:3000,
    slidesToShow:1,
    variableWidth: true,
    prevArrow: '<button class="slide-arrow03 prev-arrow03"><i class="fas fa-chevron-left"></i></button>',
    nextArrow: '<button class="slide-arrow03 next-arrow03"><i class="fas fa-chevron-right"></i></button>',
    dots:false,
  });


  // top-sec03のモーダル
  $('.top-sec03-contents-item').click(function() {

    $("html").addClass("is-fixed");
    var id = $(this).data('id');
    $('.top-sec03__modal-bg, .modal-close, .top-sec03-modal-item[id="modal_' + id + '"]').fadeIn();
    
    $('.top-sec03__modal-bg').click(function() {
      $(this).fadeOut();
      $('.top-sec03-modal-item').fadeOut();
      $("html").removeClass("is-fixed");
      if(!$('top-sec03-modal-item__tabs ul li:first-of-type a').hasClass('current')) {
        $('top-sec03-modal-item__tabs ul li:first-of-type a').addClass('current');
      }
      if($('top-sec03-modal-item__tabs ul li:last-of-type a').hasClass('current')) {
        $('top-sec03-modal-item__tabs ul li:last-of-type a').removeClass('current');
      }

    });

    $('.modal-close').click(function() {
      $('.top-sec03__modal-bg, .top-sec03-modal-item').fadeOut();
      $("html").removeClass("is-fixed");
      if(!$('top-sec03-modal-item__tabs ul li:first-of-type a').hasClass('current')) {
        $('top-sec03-modal-item__tabs ul li:first-of-type a').addClass('current');
      }
      if($('top-sec03-modal-item__tabs ul li:last-of-type a').hasClass('current')) {
        $('top-sec03-modal-item__tabs ul li:last-of-type a').removeClass('current');
      }
    });


    $(slick_target).slick('unslick');//slickの初期化

    slick_target = '.slide-wrap-modal_' + id;
    console.log(slick_target);

    setTimeout(modal_tab_slide(slick_target), 1000);

    return false;
  });

  var slick_target;


  // top-sec03モーダルのタブ
  $('.top-sec03-modal-item__tabs ul li a').click(function(){
    $($(this).attr("href")).siblings().hide();
    // $('.top-sec03-modal-item__content .top-sec03-tab-item').hide();
    console.log($(this).attr("href"));
    $($(this).attr("href")).show();
    $(this).parent().siblings().children('.current').removeClass('current');
    $(this).addClass('current');

    return false;
  });


  // top-sec03モーダルのスライダー
  
  function modal_tab_slide(e) {
    $(e).slick({
      slidesToShow:1,
      variableWidth: true,
      prevArrow: '<button class="slide-arrow03-tab prev-arrow03-tab"><i class="fas fa-chevron-left"></i></button>',
      nextArrow: '<button class="slide-arrow03-tab next-arrow03-tab"><i class="fas fa-chevron-right"></i></button>',
      dots:false,
    });
  }

})(jQuery);