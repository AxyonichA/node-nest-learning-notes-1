'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">nestjs-app documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AppModule-548747156e9b9f1bf9164807d646b32afe69f9f62927b4740849ece8b14c39cad4f38f8ef0ff13d5cc49e2d6ac39ba9bfbb204315e8f02eabc45e87b2253b29e"' : 'data-bs-target="#xs-controllers-links-module-AppModule-548747156e9b9f1bf9164807d646b32afe69f9f62927b4740849ece8b14c39cad4f38f8ef0ff13d5cc49e2d6ac39ba9bfbb204315e8f02eabc45e87b2253b29e"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AppModule-548747156e9b9f1bf9164807d646b32afe69f9f62927b4740849ece8b14c39cad4f38f8ef0ff13d5cc49e2d6ac39ba9bfbb204315e8f02eabc45e87b2253b29e"' :
                                            'id="xs-controllers-links-module-AppModule-548747156e9b9f1bf9164807d646b32afe69f9f62927b4740849ece8b14c39cad4f38f8ef0ff13d5cc49e2d6ac39ba9bfbb204315e8f02eabc45e87b2253b29e"' }>
                                            <li class="link">
                                                <a href="controllers/AppController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppController</a>
                                            </li>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-548747156e9b9f1bf9164807d646b32afe69f9f62927b4740849ece8b14c39cad4f38f8ef0ff13d5cc49e2d6ac39ba9bfbb204315e8f02eabc45e87b2253b29e"' : 'data-bs-target="#xs-injectables-links-module-AppModule-548747156e9b9f1bf9164807d646b32afe69f9f62927b4740849ece8b14c39cad4f38f8ef0ff13d5cc49e2d6ac39ba9bfbb204315e8f02eabc45e87b2253b29e"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-548747156e9b9f1bf9164807d646b32afe69f9f62927b4740849ece8b14c39cad4f38f8ef0ff13d5cc49e2d6ac39ba9bfbb204315e8f02eabc45e87b2253b29e"' :
                                        'id="xs-injectables-links-module-AppModule-548747156e9b9f1bf9164807d646b32afe69f9f62927b4740849ece8b14c39cad4f38f8ef0ff13d5cc49e2d6ac39ba9bfbb204315e8f02eabc45e87b2253b29e"' }>
                                        <li class="link">
                                            <a href="injectables/AppService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AuthModule.html" data-type="entity-link" >AuthModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-AuthModule-8e2f3c621b93528eee201f5e4c97c23c2afdc15796b58ef6b9e3ef65f1bcfbbbb6dfd1f766d1a33b0cf369cfa0a0517d9de33b37dc69db71212d70b5a6572682"' : 'data-bs-target="#xs-controllers-links-module-AuthModule-8e2f3c621b93528eee201f5e4c97c23c2afdc15796b58ef6b9e3ef65f1bcfbbbb6dfd1f766d1a33b0cf369cfa0a0517d9de33b37dc69db71212d70b5a6572682"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-AuthModule-8e2f3c621b93528eee201f5e4c97c23c2afdc15796b58ef6b9e3ef65f1bcfbbbb6dfd1f766d1a33b0cf369cfa0a0517d9de33b37dc69db71212d70b5a6572682"' :
                                            'id="xs-controllers-links-module-AuthModule-8e2f3c621b93528eee201f5e4c97c23c2afdc15796b58ef6b9e3ef65f1bcfbbbb6dfd1f766d1a33b0cf369cfa0a0517d9de33b37dc69db71212d70b5a6572682"' }>
                                            <li class="link">
                                                <a href="controllers/AuthController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AuthModule-8e2f3c621b93528eee201f5e4c97c23c2afdc15796b58ef6b9e3ef65f1bcfbbbb6dfd1f766d1a33b0cf369cfa0a0517d9de33b37dc69db71212d70b5a6572682"' : 'data-bs-target="#xs-injectables-links-module-AuthModule-8e2f3c621b93528eee201f5e4c97c23c2afdc15796b58ef6b9e3ef65f1bcfbbbb6dfd1f766d1a33b0cf369cfa0a0517d9de33b37dc69db71212d70b5a6572682"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AuthModule-8e2f3c621b93528eee201f5e4c97c23c2afdc15796b58ef6b9e3ef65f1bcfbbbb6dfd1f766d1a33b0cf369cfa0a0517d9de33b37dc69db71212d70b5a6572682"' :
                                        'id="xs-injectables-links-module-AuthModule-8e2f3c621b93528eee201f5e4c97c23c2afdc15796b58ef6b9e3ef65f1bcfbbbb6dfd1f766d1a33b0cf369cfa0a0517d9de33b37dc69db71212d70b5a6572682"' }>
                                        <li class="link">
                                            <a href="injectables/AuthService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/PostsModule.html" data-type="entity-link" >PostsModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-PostsModule-3c1d2c0fcf786689117a909f19858915dbd286c43f7e523b90951a72024ea5f3f4558bdf3001d4fef61fbfeeeaecf39c176e1bc37dcafbac0fa92f336053119b"' : 'data-bs-target="#xs-controllers-links-module-PostsModule-3c1d2c0fcf786689117a909f19858915dbd286c43f7e523b90951a72024ea5f3f4558bdf3001d4fef61fbfeeeaecf39c176e1bc37dcafbac0fa92f336053119b"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-PostsModule-3c1d2c0fcf786689117a909f19858915dbd286c43f7e523b90951a72024ea5f3f4558bdf3001d4fef61fbfeeeaecf39c176e1bc37dcafbac0fa92f336053119b"' :
                                            'id="xs-controllers-links-module-PostsModule-3c1d2c0fcf786689117a909f19858915dbd286c43f7e523b90951a72024ea5f3f4558bdf3001d4fef61fbfeeeaecf39c176e1bc37dcafbac0fa92f336053119b"' }>
                                            <li class="link">
                                                <a href="controllers/PostsController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-PostsModule-3c1d2c0fcf786689117a909f19858915dbd286c43f7e523b90951a72024ea5f3f4558bdf3001d4fef61fbfeeeaecf39c176e1bc37dcafbac0fa92f336053119b"' : 'data-bs-target="#xs-injectables-links-module-PostsModule-3c1d2c0fcf786689117a909f19858915dbd286c43f7e523b90951a72024ea5f3f4558bdf3001d4fef61fbfeeeaecf39c176e1bc37dcafbac0fa92f336053119b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-PostsModule-3c1d2c0fcf786689117a909f19858915dbd286c43f7e523b90951a72024ea5f3f4558bdf3001d4fef61fbfeeeaecf39c176e1bc37dcafbac0fa92f336053119b"' :
                                        'id="xs-injectables-links-module-PostsModule-3c1d2c0fcf786689117a909f19858915dbd286c43f7e523b90951a72024ea5f3f4558bdf3001d4fef61fbfeeeaecf39c176e1bc37dcafbac0fa92f336053119b"' }>
                                        <li class="link">
                                            <a href="injectables/PostsService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PostsService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UsersModule.html" data-type="entity-link" >UsersModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#controllers-links-module-UsersModule-fdc4e942de96f4d1db2aa4d61a4e833016eee4a746fdbb3181a22c70fc47499bf5f384df873327106beb845805e807db614c0cac4b89bb1394bd134712045295"' : 'data-bs-target="#xs-controllers-links-module-UsersModule-fdc4e942de96f4d1db2aa4d61a4e833016eee4a746fdbb3181a22c70fc47499bf5f384df873327106beb845805e807db614c0cac4b89bb1394bd134712045295"' }>
                                            <span class="icon ion-md-swap"></span>
                                            <span>Controllers</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="controllers-links-module-UsersModule-fdc4e942de96f4d1db2aa4d61a4e833016eee4a746fdbb3181a22c70fc47499bf5f384df873327106beb845805e807db614c0cac4b89bb1394bd134712045295"' :
                                            'id="xs-controllers-links-module-UsersModule-fdc4e942de96f4d1db2aa4d61a4e833016eee4a746fdbb3181a22c70fc47499bf5f384df873327106beb845805e807db614c0cac4b89bb1394bd134712045295"' }>
                                            <li class="link">
                                                <a href="controllers/UsersController.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersController</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-UsersModule-fdc4e942de96f4d1db2aa4d61a4e833016eee4a746fdbb3181a22c70fc47499bf5f384df873327106beb845805e807db614c0cac4b89bb1394bd134712045295"' : 'data-bs-target="#xs-injectables-links-module-UsersModule-fdc4e942de96f4d1db2aa4d61a4e833016eee4a746fdbb3181a22c70fc47499bf5f384df873327106beb845805e807db614c0cac4b89bb1394bd134712045295"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-UsersModule-fdc4e942de96f4d1db2aa4d61a4e833016eee4a746fdbb3181a22c70fc47499bf5f384df873327106beb845805e807db614c0cac4b89bb1394bd134712045295"' :
                                        'id="xs-injectables-links-module-UsersModule-fdc4e942de96f4d1db2aa4d61a4e833016eee4a746fdbb3181a22c70fc47499bf5f384df873327106beb845805e807db614c0cac4b89bb1394bd134712045295"' }>
                                        <li class="link">
                                            <a href="injectables/UsersService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UsersService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#controllers-links"' :
                                'data-bs-target="#xs-controllers-links"' }>
                                <span class="icon ion-md-swap"></span>
                                <span>Controllers</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="controllers-links"' : 'id="xs-controllers-links"' }>
                                <li class="link">
                                    <a href="controllers/AppController.html" data-type="entity-link" >AppController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/AuthController.html" data-type="entity-link" >AuthController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/PostsController.html" data-type="entity-link" >PostsController</a>
                                </li>
                                <li class="link">
                                    <a href="controllers/UsersController.html" data-type="entity-link" >UsersController</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/CreatePostDto.html" data-type="entity-link" >CreatePostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreatePostMetaOptionsDto.html" data-type="entity-link" >CreatePostMetaOptionsDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/CreateUserDto.html" data-type="entity-link" >CreateUserDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/GetUsersParamDto.html" data-type="entity-link" >GetUsersParamDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchPostDto.html" data-type="entity-link" >PatchPostDto</a>
                            </li>
                            <li class="link">
                                <a href="classes/PatchUserDto.html" data-type="entity-link" >PatchUserDto</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AppService.html" data-type="entity-link" >AppService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PostsService.html" data-type="entity-link" >PostsService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsersService.html" data-type="entity-link" >UsersService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});