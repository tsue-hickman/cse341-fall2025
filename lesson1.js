const sarahRoute = (req, res) => {
    res.send('Sarah Birch')
};

const emilyRoute = (req, res) => {
    res.send('Emily Birch')
};

const hannahRoute = (req, res) => {
    res.send('Hannah Birch');
};

module.exports = {
    sarahRoute,
    emilyRoute, 
    hannahRoute,
};