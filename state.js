/* ═══════════════════════════════════════
   ArtRoom — Shared State (localStorage)
   ═══════════════════════════════════════ */
const ArtState = {
  _get(key) { try { return JSON.parse(localStorage.getItem('artroom_' + key)) || []; } catch { return []; } },
  _set(key, val) { localStorage.setItem('artroom_' + key, JSON.stringify(val)); },

  /* ── Purchases ── */
  getPurchases()   { return this._get('purchases'); },
  addPurchase(item) {
    const list = this.getPurchases();
    if (!list.some(p => p.title === item.title)) { list.push({ ...item, date: Date.now() }); this._set('purchases', list); }
  },
  hasPurchased(title) { return this.getPurchases().some(p => p.title === title); },

  /* ── Saves (to studio) ── */
  getSaves()      { return this._get('saves'); },
  toggleSave(item) {
    let list = this.getSaves();
    const idx = list.findIndex(s => s.title === item.title);
    if (idx > -1) { list.splice(idx, 1); this._set('saves', list); return false; }
    list.push({ ...item, date: Date.now() }); this._set('saves', list); return true;
  },
  isSaved(title)  { return this.getSaves().some(s => s.title === title); },

  /* ── Likes ── */
  getLikes()      { return this._get('likes'); },
  toggleLike(title) {
    let list = this.getLikes();
    const idx = list.indexOf(title);
    if (idx > -1) { list.splice(idx, 1); this._set('likes', list); return false; }
    list.push(title); this._set('likes', list); return true;
  },
  isLiked(title)  { return this.getLikes().includes(title); },

  /* ── Follows ── */
  getFollows()    { return this._get('follows'); },
  toggleFollow(handle) {
    let list = this.getFollows();
    const idx = list.indexOf(handle);
    if (idx > -1) { list.splice(idx, 1); this._set('follows', list); return false; }
    list.push(handle); this._set('follows', list); return true;
  },
  isFollowing(handle) { return this.getFollows().includes(handle); },

  /* ── Skills ── */
  getSkills()     { return this._get('skills'); },
  installSkill(skill) {
    const list = this.getSkills();
    if (!list.some(s => s.name === skill.name)) { list.push({ ...skill, date: Date.now() }); this._set('skills', list); }
  },
  hasSkill(name)  { return this.getSkills().some(s => s.name === name); },

  /* ── Comments ── */
  getComments(designId) { return this._get('comments_' + designId); },
  addComment(designId, text) {
    const list = this._get('comments_' + designId);
    list.push({ text, user: 'You', date: Date.now() });
    this._set('comments_' + designId, list);
    return list;
  },

  /* ── Applications ── */
  getApplications() { return this._get('applications'); },
  applyToJob(jobId, title) {
    const list = this.getApplications();
    if (!list.some(a => a.id === jobId)) { list.push({ id: jobId, title, date: Date.now() }); this._set('applications', list); }
  },
  hasApplied(jobId) { return this.getApplications().some(a => a.id === jobId); },

  /* ── Cart ── */
  getCart()       { return this._get('cart'); },
  addToCart(item) {
    const list = this.getCart();
    if (!list.some(c => c.title === item.title)) { list.push(item); this._set('cart', list); }
  },
  clearCart()     { this._set('cart', []); },

  /* ── Profile ── */
  getProfile() { try { return JSON.parse(localStorage.getItem('artroom_profile')) || {}; } catch { return {}; } },
  setProfile(data) { localStorage.setItem('artroom_profile', JSON.stringify(data)); },

  /* ── Utility ── */
  clearAll() { Object.keys(localStorage).filter(k => k.startsWith('artroom_')).forEach(k => localStorage.removeItem(k)); },
};
