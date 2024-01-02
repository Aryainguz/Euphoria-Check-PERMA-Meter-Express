let flash = require('connect-flash');
const { request } = require('express');

function validateInputResults(req, res, next) {
    const isValidA =
        parseFloat(req.body.avalue) == 0 || parseFloat(req.body.avalue) == 5;
    const isValidB =
        parseFloat(req.body.bvalue) == 0 || parseFloat(req.body.bvalue) == 5;
    const isValidC =
        parseFloat(req.body.cvalue) == 0 || parseFloat(req.body.cvalue) == 5;
    const isValidD =
        parseFloat(req.body.dvalue) == 0 || parseFloat(req.body.dvalue) == 5;
    const isValidE =
        parseFloat(req.body.evalue) == 0 || parseFloat(req.body.evalue) == 5;
    const isValidF =
        parseFloat(req.body.fvalue) == 0 || parseFloat(req.body.fvalue) == 5;
    const isValidG =
        parseFloat(req.body.gvalue) == 0 || parseFloat(req.body.gvalue) == 5;
    const isValidH =
        parseFloat(req.body.hvalue) == 0 || parseFloat(req.body.hvalue) == 5;
    const isValidI =
        parseFloat(req.body.ivalue) == 0 || parseFloat(req.body.ivalue) == 5;
    const isValidJ =
        parseFloat(req.body.jvalue) == 0 || parseFloat(req.body.jvalue) == 5;
    const isValidK =
        parseFloat(req.body.kvalue) == 0 || parseFloat(req.body.kvalue) == 5;
    const isValidL =
        parseFloat(req.body.lvalue) == 0 || parseFloat(req.body.lvalue) == 5;
    const isValidM =
        parseFloat(req.body.mvalue) == 0 || parseFloat(req.body.mvalue) == 6;
    const isValidN =
        parseFloat(req.body.nvalue) == 0 || parseFloat(req.body.nvalue) == 5;
    const isValidO =
        parseFloat(req.body.ovalue) == 0 || parseFloat(req.body.ovalue) == 5;
    const isValidP =
        parseFloat(req.body.pvalue) == 0 || parseFloat(req.body.pvalue) == 5;
    const isValidQ =
        parseFloat(req.body.qvalue) == 0 || parseFloat(req.body.qvalue) == 5;
    const isValidR =
        parseFloat(req.body.rvalue) == 0 || parseFloat(req.body.rvalue) == 5;
    const isValidS =
        parseFloat(req.body.svalue) == 0 || parseFloat(req.body.svalue) == 5;
    const isValidT =
        parseFloat(req.body.tvalue) == 0 || parseFloat(req.body.tvalue) == 5;
  
    const allValidParameters =
        isValidA &&
        isValidB &&
        isValidC &&
        isValidD &&
        isValidE &&
        isValidF &&
        isValidG &&
        isValidH &&
        isValidI &&
        isValidJ &&
        isValidK &&
        isValidL &&
        isValidM &&
        isValidN &&
        isValidO &&
        isValidP &&
        isValidQ &&
        isValidR &&
        isValidS &&
        isValidT;
  
    if (!allValidParameters) {
        req.flash("message", "Please provide valid answers for all the questions");
        res.render("questions", {message: req.flash('message')});
        return;
    }
  
    next();
}
 
module.exports = validateInputResults;