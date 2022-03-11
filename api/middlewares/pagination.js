const paginateResults = (model) => {
    return async (req,res,next)=>{

        let {page} = req.query;
        page = parseInt(page);
        
        const NO_PAGE_OR_ZERO = (!page || page == 0);
        if(NO_PAGE_OR_ZERO) page = 1;
        const LIMIT = 5;

        const startIndex = (page - 1) * LIMIT;
        const endIndex = page * LIMIT;

        res.customOptions = {
            startIndex: startIndex,
            limit: LIMIT
        }

        const DOC_COUNT = await model.countDocuments();

        if (endIndex < DOC_COUNT) res.customOptions.next_page = page + 1
        if (startIndex > 0) res.customOptions.previous_page = page - 1;

        next();
    }
}

module.exports = {
    paginateResults
}