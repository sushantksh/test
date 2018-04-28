var express = require('express');
var router = express.Router();
var mysql = require('./mysql');

// Revenue by Movie
router.get('/getRevenueByMovie', function(req, res, next) {
  console.log(req.query);
  let sqlQuery = `Select m.title, m.photosUrl, m.releaseDate, sum(b.amount * b.ticketCount) as totalRevenue
                  from Billing b inner join Movies m on m.movieId = b.movieId
                  where b.movieId=${req.query.movieId} and b.status="booked" group by m.title`;
  mysql.fetchData(function(err, results) {
    if(err) {
      res.status(400).json({error: "Unable to get revenue by movie"});
    } else {
      res.status(200).json({result: results[0]});
    }
  }, sqlQuery);
});

// Revenue by Hall
router.get('/getRevenueByHall', function(req, res, next) {
  console.log(req.query);
  let sqlQuery = `Select mh.hallName, mh.state, mh.city, mh.zipcode,
                  sum(b.amount * b.ticketCount) as totalRevenue
                  from Billing b inner join MovieHall mh on mh.hallId = b.hallId
                  where mh.hallId=${req.query.hallId} and b.status="booked" group by mh.hallName`;
  mysql.fetchData(function(err, results) {
    if(err) {
      res.status(400).json({error: "Unable to get revenue by movie"});
    } else {
      res.status(200).json({result: results[0]});
    }
  }, sqlQuery);
});

router.get('/getAllMovies', function(req, res, next) {
  let sqlQuery = `select movieId, title from Movies`;
  mysql.fetchData(function(err, results) {
    if(err) {
      res.status(400).json({error: "Unable to get all the movies"});
    } else {
      res.status(200).json({result: results});
    }
  }, sqlQuery);
});

router.get('/getAllMovieHalls', function(req, res, next) {
  let sqlQuery = `select hallId, hallName from MovieHall`;
  mysql.fetchData(function(err, results) {
    if(err) {
      res.status(400).json({error: "Unable to get all movie halls"});
    } else {
      res.status(200).json({result: results});
    }
  }, sqlQuery);
});

module.exports = router;
