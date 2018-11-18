'use strict'

$(window).load (e) ->
    pattern = Trianglify({
        width: window.innerWidth,
        height: window.innerHeight
    });
    document.body.appendChild(pattern.canvas())
    $('.loader').fadeOut()
    return

$(document).ready (e) ->
    sectorSelector = $('.circle-wrapper .sector')
    centerSelector = $('.center-sector')
    sectorSelector.hover (e) ->
        $('.center-sector .img').fadeOut 0
        centerSelector.addClass 'active'
        index = $(this).index()
        centerSelector.attr 'data-sector', index
        $img = $('.center-sector div').get(index)
        #$($img).addClass('current');
        $($img).fadeIn 0
        return
    $('.circle-wrapper').mouseleave (e) ->
        centerSelector.removeClass 'active'
        $('.center-sector .img').fadeOut 0
        return
    sectorSelector.click (e) ->
        index = $(this).index()
        $info = $('.circle-wrapper .info-circle').get(index)
        $($info).addClass 'active'
        return
    centerSelector.click (e) ->
        index = $(this).attr('data-sector')
        $info = $('.circle-wrapper .info-circle').get(index)
        $($info).addClass 'active'
        return
    $('.info-circle .close-info').click (e) ->
        $('.info-circle').removeClass 'active'
        return
    $('.lettering').lettering()
    return