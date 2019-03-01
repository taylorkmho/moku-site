// import Vue from 'vue'
import { modalSetUp } from './modal-set-up'
import { mapSetUp } from './map-set-up'
import { inlineVideoSetUp } from './inline-video-set-up'
import { newsletterBalloonSetUp } from './newsletter-balloon-set-up'
import { resourcesFolderSetUp } from './resources-folder-set-up'
import { smartThumbnailSetUp } from './smart-thumbnail-set-up'
import { asideLinksSetUp } from './aside-links-set-up'
import { videoLinksSetUp } from './video-links-set-up'
import { categoriesListSetUp } from './categories-list-set-up'
import { smartCategoryLinkSetUp } from './smart-category-link-set-up'
import { resourcesMiniListSetUp } from './resources-mini-list-set-up'
import { siteHeaderSetUp } from './site-header-set-up'
import { staffSetUp } from './staff-set-up'

if (document.body.classList.contains('not-loaded')) {
  document.body.classList.remove('not-loaded')
}

new modalSetUp()
new mapSetUp()
new inlineVideoSetUp()
new newsletterBalloonSetUp()
new resourcesFolderSetUp()
new smartThumbnailSetUp()
new asideLinksSetUp()
new videoLinksSetUp()
new categoriesListSetUp()
new smartCategoryLinkSetUp()
new resourcesMiniListSetUp()
new siteHeaderSetUp()
new staffSetUp()

// Vue.config.devtools = true
