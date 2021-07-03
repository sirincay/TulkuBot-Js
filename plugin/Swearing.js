'use strict';

const { Composer } = require('telegraf')

const badWordsBan = [
    /(?:^|[^\wığüşöçĞÜŞÖÇI])([sSśŚšŠ]+(\s+)?[OoōŌøØõÕóÓòÒôÔöÖ]+(\s+)?[kKqQ]+(\s+)?[aAâÂäÄáÁuUūŪùÙúÚûÛ]+([yYýÝ]+)?(\s+)?([jìÌíÍįĮīĪîÎïÏiİ!¡ıIİ]+)?(\s+)?[mM]+)/i, 
	/(?:^|[^\wığüşöçĞÜŞÖÇI])([aAâÂäÄáÁ@]+(\s+)?[vV]+(\s+)?[rR]+(\s+)?[aAâÂäÄáÁ@]+(\s+)?[dDtT]+)/i, 
	/(?:^|[^\wığüşöçĞÜŞÖÇI])([dD]+)(\s+)?([iİ]+)(\s+)?([lL]+)(\s+)?([dD]+)(\s+)?([oO]+)/i, 
	/(?:^|[^\wığüşöçĞÜŞÖÇI@])([pP]+(\s+)?([jJìÌíÍįĮīĪîÎïÏiİ!¡Iı\*\.]+)(\s+)?[çcÇCJj]+(?:[^\wığüşöçĞÜŞÖÇİ]|$))/i, 
	/(?:^|[^\wığüşöçĞÜŞÖÇI])([pP]+(\s+)?([jJìÌíÍįĮīĪîÎïÏiİ!¡Iı\*\.]+)(\s+)?[çcÇCJj]+(?:^|[lLeEiİ]))/i, 
	/(?:^|[^\wığüşöçĞÜŞÖÇI])([ou0@]+(\s+)?[rR]+(\s+)?[ou0@]+(\s+)?[sSzZ]+(\s+)?[pPbBvV]+)/i, 
	/(?:^|[^\wığüşöçĞÜŞÖÇI])(([pP]+)(\s+)?([oO0\*]+)(\s+)?([rR]+)(\s+)?([nN]+)(?!ograf[iı]))/i, 
	/(?:^|[^\wığüşöçĞÜŞÖÇI])(([oO0@]+)(\s+)?([\.\,\'\:\·\*]+)?(\s+)?[çÇ]+(?:^|[lL]))/i, 
	/(?:^|[^\wığüşöçĞÜŞÖÇI])(([oO0@]+)(\s+)?([\.\,\'\:\·\*]+)?(\s+)?[çÇcC]+(?:[^\wığüşöçĞÜŞÖÇİ]|$))/i, 
	/(?:^|[^\wığüşöçĞÜŞÖÇIİ])((([(sSśŚšŠ\$)]+)(\s+)?([jìÌíÍįĮīĪîÎïÏiİ!¡Iı\.\*]+)(\s+)?[kKgGqQ]+([dir|Dir]+)?(\s+)?[jìÌíÍįĮīĪîÎïÏiİ!¡iİeEtTmMlLsS]+(\s+)?[jìÌíÍįĮīĪîÎïÏiİ!¡iİ\.\*cCéÉ3êÊeEmMnNşŞsSyY\.\$rR]+)(?!t|a))/i, 
	/([yYýÝvV]+(\s+)?[aAâÂäÄáÁ@]+(\s+)?[wWvV]+(\s+)?([uU]+)?(\s+)?[şŞsSśŚšŠ\$]+(\s+)?[aAâÂäÄáÁ]+(\s+)?[kKqQhHgG]+)/i, 
	/(?<!v(a)+(y)+)(?:^|[^\wığüşöçĞÜŞÖÇI])([aAâÂäÄáÁ@]+(\s+)?[nNňŇñÑ]+(\s+)?[aAâÂäÄáÁ@]+(\s+)?[nNňŇñÑsSşŞ\$]+)(?!ayfa|[ıIiİ]n[ıIiİ]f|[ıIiİ]n[ıIiİ]f|[ıIiİ]l)/i, 
	/(?:^|[^\wığüşöçĞÜŞÖÇI])([bB]+(\s+)?[aAâÂäÄáÁ@]+(\s+)?[cC]+(\s+)?[jJìÌíÍįĮīĪîÎïÏiİ!¡ıI\.]+(\s+)?[nNňŇñÑsSşŞ\$]+)/i, 
	/(?:^|[^\wığüşöçĞÜŞÖÇI])([jìÌíÍįĮīĪîÎïÏiİ!¡ıIİ\*]+(\s+)?[fF]+(\s+)?[sSśŚŞşšŠ\$]+(\s+)?[aAâÂäÄáÁ@]+)/i, 
	/(?:^|[^\wığüşöçĞÜŞÖÇI])([kKqQgGğĞ]+(\s+)?([aAâÂäÄáÁ@]+)?(\s+)?[śŚŞşšŠ\$]+(\s+)?([aAâÂäÄáÁ@]+)?(\s+)?[rR]+)/i, 
	/([pPbB]+([éÉ3êÊeE]+)?[zZžŽ]+([éÉ3êÊeE]+)?[vVyY]+([éÉ3êÊeE]+)?[nNňŇñÑ]+[kKgGqQğĞ]+)/i, 
	/(?:^|[^\wığüşöçĞÜŞÖÇI])([yYýÝ]+(\s+)?([aAâÂäÄáÁ@]+)?(\s+)?[rR]+(\s+)?([aAâÂäÄáÁ@]+)(\s+)?[kKgGğĞqQ]+)/i, 
	/(?:^|[^\wığüşöçĞÜŞÖÇI])([yYýÝ]+(\s+)?([aAâÂäÄáÁ@]+)?(\s+)?(rr|RR)+(\s+)?([aAâÂäÄáÁ@]+))/i, 
	/(?:^|[^\wığüşöçĞÜŞÖÇI])([aAâÂäÄáÁ@]+(\s+)?[zZ]+(\s+)?[gGğĞqQdD]+(\s+)?[jìÌíÍįĮīĪîÎïÏiİ!¡Iı\.]+(\s+)?[nNňŇñÑmM]+)/i, 
	/(?:^|[^\wığüşöçĞÜŞÖÇI])(ferre|es[ck]ort)/i, 
	/(?:^|[^\wığüşöçĞÜŞÖÇI])([aAâÂäÄáÁ@]+(\s+)?[mM]+(\s+)?[jìÌíÍįĮīĪîÎïÏ!¡ı\.cC]+(\s+)?[jìÌíÍįĮīĪîÎïÏiİ!¡Iı\.nN]+)/i, 
	/(?:^|[^\wığüşöçĞÜŞÖÇI])([aAâÂäÄáÁ@]+(\s+)?[mM]+(\s+)?[iİjìÌíÍįĮīĪîÎïÏ!¡ıI\.]+(\s+)?[nN]+[aAâÂäÄáÁ@]+)/i, 
	/(?:^|[^\wığüşöçĞÜŞÖÇI])([gGğĞq]+(\s+)?([öÖoOōŌ0øØóÓõÕòÒôÔ]+)?(\s+)?[tT]+(\s+)?[üÜuUūŪùÙúÚûÛ]+(\s+)?[nNňŇñÑmM]+)/i, 
	/(?:^|[^\wığüşöçĞÜŞÖÇI])([gGğĞq]+(\s+)?([öÖ0ōŌ0øØóÓõÕòÒôÔ])?(\s+)?[tT]+(\s+)?([öÖoOōŌ0øØóÓõÕòÒôÔeEéÉ3êÊ]+))/i, 
	/\b[gGğĞq]+(\s+)?[öÖ]+(\s+)?[tT]+(\s+)?([üÜuU]+)?(?:[^\wığüşöçĞÜŞÖÇİ]|$)/i,
	/(?:^|[^\wığüşöçĞÜŞÖÇI])([aAâÂäÄáÁ@]+(\s+)?[mM]+(\s+)?[cC]+(\s+)?([jìÌíÍįĮīĪîÎïÏiİ!¡Iı\.\*]+)?(\s+)?[kKqgG]+)/i, 
	/([sSśŚşŞšŠ\$]+(\s+)?[eE3éÉêÊ]+(\s+)?[xX]+(\s+)?[dDiİtTvVyYýÝ]+)/i,
	/(?:^|[^\wığüşöçĞÜŞÖÇI])(boşalıyorum|boşalıcam|boşaldım|boşalmak|boşalırken|boşalmama)(?:[^\wığüşöçĞÜŞÖÇİ]|$)/i,
	/(?:^|[^\wığüşöçĞÜŞÖÇI])(sıçarım|sıçmayım|sıcarım)(?:[^\wığüşöçĞÜŞÖÇİ]|$)/i,
	/(seks|bitch|\bpenis|\bensest|\bkanc[iı]k|\bi[pb]+(i)?ne|\boral\b)/i,
	/(bicbala|peyser|\bsuka|\bqəhbə|\bkanc[iı]k|\bi[pb]+(i)?ne|\bqancıx\b)/i,
	/(dalyok|dalbayov|\bbicok|\bcındır|\bbacıvı[iı]k|\bi[pb]+(i)?ne|\boral\b)/i,
].map(regex => text => regex.exec(text));

module.exports = Composer.match(badWordsBan, async (ctx, next) => {
    if (ctx.chat.type.endsWith('group')) {
        if (!ctx.from._is_in_admin_list) {

            await ctx.deleteMessage()                       //Söyüşlü mesajlar silər
            //await ctx.kickChatMember(ctx.from.id)         //Qrupdan atılması üçün kod

        }
    }
    return next();
});
