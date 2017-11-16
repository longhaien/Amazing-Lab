var app = '201705activity';
var TEST_BEGIN = (new Date('2017-05-15 11:00:00')).getTime();
var NODE_BEGIN = (new Date('2017-05-15 11:00:00')).getTime();
var PUB_BEGIN = (new Date('2017-05-15 11:00:00')).getTime();

var DEV_DOMAIN = false;
var TEST_DOMAIN = 'http://test.hd.huya.com/' + app;
var NODE_DOMAIN = false;
var PUB_DOMAIN = 'http://hd.huya.com/' + app;

var TEST_API = 'http://test.hd.huya.com/' + app + '/static/js/common/js/data';
var PUB_API = 'http://hd.huya.com/' + app + '/static/js/common/js/data';



// fis default setting
fis
    .set('project.md5Length', 5)
    .set('project.ignore', ['node_modules/**', 'output/**', '.git/**', 'fis-conf.js', '/package.json'])
    .set('media', fis.media()['_media']);

// dev_set
fis
    .set('api', '/common/js/data')
    .set('startTime', TEST_BEGIN)
    .set('domain', 'http://test.hd.huya.com')
    .set('homeDomain', 'http://test.i.huya.com')
    .set('defaultImg', '')

// dev_replace
fis
    .match('**', {
        deploy: [
            fis.plugin('replace', {
                from: /@api/ig,
                to: fis.get('api')
            }),
            fis.plugin('replace', {
                from: /@startTime/ig,
                to: fis.get('startTime')
            }),
            fis.plugin('replace', {
                from: /@domain/ig,
                to: fis.get('domain')
            }),
            fis.plugin('replace', {
                from: /@homeDomain/ig,
                to: fis.get('homeDomain')
            }),
            fis.plugin('replace', {
                from: /@defaultImg/ig,
                to: fis.get('defaultImg')
            }),
            fis.plugin('local-deliver')
        ]
    })

fis
    .match('*.{scss,sass}', {
        rExt: '.css',
        parser: fis.plugin('node-sass', {
            // options...
        })
    })
    .match('*.{css,js}', {
        domain: DEV_DOMAIN
    })
    .match('::package', {
        postpackager: fis.plugin('loader', {
            obtainScript: false,
            obtainStyle: false
        })
    })
    .match('*.tmpl', {
        isHtmlLike: true
    })
    .match('/widget/**.{tmpl,js,css}', {
        isMod: true
    })
    .match('/widget/**', {
        useSameNameRequire: true
    })


// test_set
fis.media('test')
    .set('api', TEST_API)
    .set('startTime', TEST_BEGIN)
    .set('domain', 'http://test.hd.huya.com/' + app)
    .set('homeDomain', 'http://test.i.huya.com')
    .set('defaultImg', fis.media('test').get('domain') + '/static/img')


fis.media('test')
    .match('**', {
        deploy: [
            fis.plugin('replace', {
                from: /@api/ig,
                to: fis.media('test').get('api')
            }),
            fis.plugin('replace', {
                from: /@startTime/ig,
                to: fis.media('test').get('startTime')
            }),
            fis.plugin('replace', {
                from: /@domain/ig,
                to: fis.media('test').get('domain')
            }),
            fis.plugin('replace', {
                from: /@homeDomain/ig,
                to: fis.media('test').get('homeDomain')
            }),
            fis.plugin('replace', {
                from: /@defaultImg/ig,
                to: fis.media('test').get('defaultImg')
            }),
            fis.plugin('skip-packed', {
                // 配置项
            }),
            fis.plugin('local-deliver'),
        ]
    })

fis.media('test')
    .match('*.{scss,sass}', {
        rExt: '.css',
        parser: fis.plugin('node-sass', {
            // options...
        })
    })
    .match('*.{png,jpg}', {
        release: '/static/img/$0',
        domain: TEST_DOMAIN
    })
    .match('*.{css,js}', {
        domain: TEST_DOMAIN
    })
    .match('/common/js/**', {
        release: '/static/js/$0',
    })
    .match('::package', {
        postpackager: fis.plugin('loader', {
            obtainScript: false,
            obtainStyle: false,
            allInOne: {
                js: function(file) {
                    return "/static/js/" + file.filename + "_test.js";
                },
                css: function(file) {
                    return "/static/css/" + file.filename + "_test.css";
                }
            }
        }),
    })
    .match('*.tmpl', {
        isHtmlLike: true
    })
    .match('/widget/**.{tmpl,js,css}', {
        isMod: true
    })
    .match('/widget/**', {
        useSameNameRequire: true
    })
    .match('*.{css,js,jpg,png}', {
        useHash: true
    })
    .match('noHash/*.{jpg,png}', {
        useHash: false
    })

// node_set
fis.media('node')
    .set('api', TEST_API)
    .set('startTime', NODE_BEGIN)
    .set('domain', 'http://test.hd.huya.com/' + app)
    .set('homeDomain', 'http://test.i.huya.com')
    .set('defaultImg', '../../' + app + '/img')


fis.media('node')
    .match('**', {
        deploy: [
            fis.plugin('replace', {
                from: /@api/ig,
                to: fis.media('node').get('api')
            }),
            fis.plugin('replace', {
                from: /@startTime/ig,
                to: fis.media('node').get('startTime')
            }),
            fis.plugin('replace', {
                from: /@domain/ig,
                to: fis.media('node').get('domain')
            }),
            fis.plugin('replace', {
                from: /@homeDomain/ig,
                to: fis.media('node').get('homeDomain')
            }),
            fis.plugin('replace', {
                from: /@defaultImg/ig,
                to: fis.media('node').get('defaultImg')
            }),
            fis.plugin('skip-packed', {
                // 配置项
            }),
            fis.plugin('local-deliver'),
        ]
    })

fis.media('node')
    .match('*.{scss,sass}', {
        rExt: '.css',
        parser: fis.plugin('node-sass', {
            // options...
        })
    })
    .match('*.{png,jpg}', {
        release: '/' + app + '/img/$0',
        domain: NODE_DOMAIN
    })
    .match('*.{css,js}', {
        domain: NODE_DOMAIN
    })
    .match('/common/js/*.js', {
        release: '/' + app + '/js/$0'
    })
    .match('::package', {
        postpackager: fis.plugin('loader', {
            obtainScript: false,
            obtainStyle: false,
            allInOne: {
                js: function(file) {
                    return "/" + app + "/js/" + file.filename + "_node.js";
                },
                css: function(file) {
                    return "/" + app + "/css/" + file.filename + "_node.css";
                }
            }
        }),
    })
    .match('*.tmpl', {
        isHtmlLike: true
    })
    .match('/widget/**.{tmpl,js,css}', {
        isMod: true
    })
    .match('/widget/**', {
        useSameNameRequire: true
    })
    .match('*.{css,js}', {
        useHash: false
    })
    .match('*.{jpg,png}', {
        useHash: true
    })
    .match('noHash/*.{jpg,png}', {
        useHash: false
    })

// build_set
fis.media('build')
    .set('api', PUB_API)
    .set('startTime', PUB_BEGIN)
    .set('domain', 'http://hd.huya.com/' + app)
    .set('homeDomain', 'http://i.huya.com/')
    .set('defaultImg', fis.media('build').get('domain') + '/static/img')


fis.media('build')
    .match('**', {
        deploy: [
            fis.plugin('replace', {
                from: /@api/ig,
                to: fis.media('build').get('api')
            }),
            fis.plugin('replace', {
                from: /@startTime/ig,
                to: fis.media('build').get('startTime')
            }),
            fis.plugin('replace', {
                from: /@domain/ig,
                to: fis.media('build').get('domain')
            }),
            fis.plugin('replace', {
                from: /@homeDomain/ig,
                to: fis.media('build').get('homeDomain')
            }),
            fis.plugin('replace', {
                from: /@defaultImg/ig,
                to: fis.media('build').get('defaultImg')
            }),
            fis.plugin('skip-packed', {
                // 配置项
            }),
            fis.plugin('local-deliver'),
        ]
    })

fis.media('build')
    .match('*.{scss,sass}', {
        rExt: '.css',
        parser: fis.plugin('node-sass', {
            // options...
        })
    })
    .match('*.{png,jpg}', {
        release: '/static/img/$0',
        domain: PUB_DOMAIN
    })
    .match('*.{css,js}', {
        domain: PUB_DOMAIN
    })
    .match('/common/js/*.js', {
        release: '/static/js/$0'
    })
    .match('::package', {
        postpackager: fis.plugin('loader', {
            obtainScript: false,
            obtainStyle: false,
            allInOne: {
                js: function(file) {
                    return "/static/js/" + file.filename + "_pub.js";
                },
                css: function(file) {
                    return "/static/css/" + file.filename + "_pub.css";
                }
            }
        }),
    })
    .match('*.tmpl', {
        isHtmlLike: true
    })
    .match('/widget/**.{tmpl,js,css}', {
        isMod: true
    })
    .match('/widget/**', {
        useSameNameRequire: true
    })
    .match('*.{css,js,jpg,png}', {
        useHash: true
    })
    .match('noHash/*.{jpg,png}', {
        useHash: false
    })
