export type Locale = 'en' | 'fr' | 'zh-CN' | 'zh-TW'

export const locales: Locale[] = ['en', 'fr', 'zh-CN', 'zh-TW']

export const ui = {
  en: { essays:'Essays', archive:'Archive', about:'About', signup:'Sign up', subscribe:'Subscribe', contact:'Contact', donate:'Donate', search:'Search', menu:'Menu', latest:'Latest essays', motto:'Life is unfinished…', dek:'Writing about the relation between people and the world.', categories:'Philosophy · Nature · Human rights · Environment · Society · History · Politics', aboutUs:'About us', ourVision:'Our vision', ourArchive:'Our archive', commentingPrinciples:'Commenting principles', privacyPolicy:'Privacy policy', termsOfUse:'Terms of use', accessibilityStatement:'Accessibility statement', donationStatement:'Donation statement', contactUs:'Contact us' },
  fr: { essays:'Essais', archive:'Archives', about:'À propos', signup:'Créer un compte', subscribe:'S’abonner', contact:'Contact', donate:'Faire un don', search:'Rechercher', menu:'Menu', latest:'Derniers essais', motto:'La vie reste inachevée…', dek:'Écrire sur la relation entre les personnes et le monde.', categories:'Philosophie · Nature · Droits humains · Environnement · Société · Histoire · Politique', aboutUs:'À propos de nous', ourVision:'Notre vision', ourArchive:'Nos archives', commentingPrinciples:'Principes des commentaires', privacyPolicy:'Politique de confidentialité', termsOfUse:'Conditions d’utilisation', accessibilityStatement:'Déclaration d’accessibilité', donationStatement:'Déclaration sur les dons', contactUs:'Nous contacter' },
  'zh-CN': { essays:'散文', archive:'档案', about:'关于我们', signup:'注册', subscribe:'订阅', contact:'联系我们', donate:'捐赠', search:'搜索', menu:'菜单', latest:'最新散文', motto:'人生未完成…', dek:'书写人与世界的关系。', categories:'哲学 · 自然 · 人权 · 环境 · 社会 · 历史 · 政治', aboutUs:'关于我们', ourVision:'我们的愿景', ourArchive:'我们的档案', commentingPrinciples:'评论原则', privacyPolicy:'隐私政策', termsOfUse:'使用条款', accessibilityStatement:'无障碍声明', donationStatement:'捐赠声明', contactUs:'联系我们' },
  'zh-TW': { essays:'散文', archive:'檔案', about:'關於我們', signup:'註冊', subscribe:'訂閱', contact:'聯絡我們', donate:'捐贈', search:'搜尋', menu:'選單', latest:'最新散文', motto:'人生未完成…', dek:'書寫人與世界的關係。', categories:'哲學 · 自然 · 人權 · 環境 · 社會 · 歷史 · 政治', aboutUs:'關於我們', ourVision:'我們的願景', ourArchive:'我們的檔案', commentingPrinciples:'評論原則', privacyPolicy:'隱私政策', termsOfUse:'使用條款', accessibilityStatement:'無障礙聲明', donationStatement:'捐贈聲明', contactUs:'聯絡我們' }
} as const

export const articles = [
  {slug:'where-the-world-begins', category:'Philosophy', title:'Where does the world begin?', dek:'A boundary is not only where one thing ends. It is also where relation becomes visible.', author:'Mira Vale', date:'2026-09-24'},
  {slug:'the-river-keeps-a-record', category:'Environment', title:'The river keeps a record', dek:'Pollution has a history, but so does repair. Both can be read in water.', author:'Elias Chen', date:'2026-09-18'},
  {slug:'rights-without-distance', category:'Human rights', title:'Rights without distance', dek:'What changes when another person’s suffering reaches us as an image before it reaches us as a fact?', author:'Nadia Laurent', date:'2026-09-11'},
  {slug:'ordinary-history', category:'History', title:'The ordinary scale of history', dek:'Grand narratives are built from small rooms, repeated gestures and decisions that rarely make archives.', author:'Jonas Wei', date:'2026-08-30'}
]

