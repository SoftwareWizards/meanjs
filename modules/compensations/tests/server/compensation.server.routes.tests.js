'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Compensation = mongoose.model('Compensation'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  compensation;

/**
 * Compensation routes tests
 */
describe('Compensation CRUD tests', function () {

  before(function (done) {
    // Get application
    app = express.init(mongoose);
    agent = request.agent(app);

    done();
  });

  beforeEach(function (done) {
    // Create user credentials
    credentials = {
      username: 'username',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create a new user
    user = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'test@test.com',
      username: credentials.username,
      password: credentials.password,
      provider: 'local'
    });

    // Save a user to the test db and create new Compensation
    user.save(function () {
      compensation = {
        name: 'Compensation name'
      };

      done();
    });
  });

  it('should be able to save a Compensation if logged in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Compensation
        agent.post('/api/compensations')
          .send(compensation)
          .expect(200)
          .end(function (compensationSaveErr, compensationSaveRes) {
            // Handle Compensation save error
            if (compensationSaveErr) {
              return done(compensationSaveErr);
            }

            // Get a list of Compensations
            agent.get('/api/compensations')
              .end(function (compensationsGetErr, compensationsGetRes) {
                // Handle Compensations save error
                if (compensationsGetErr) {
                  return done(compensationsGetErr);
                }

                // Get Compensations list
                var compensations = compensationsGetRes.body;

                // Set assertions
                (compensations[0].user._id).should.equal(userId);
                (compensations[0].name).should.match('Compensation name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Compensation if not logged in', function (done) {
    agent.post('/api/compensations')
      .send(compensation)
      .expect(403)
      .end(function (compensationSaveErr, compensationSaveRes) {
        // Call the assertion callback
        done(compensationSaveErr);
      });
  });

  it('should not be able to save an Compensation if no name is provided', function (done) {
    // Invalidate name field
    compensation.name = '';

    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Compensation
        agent.post('/api/compensations')
          .send(compensation)
          .expect(400)
          .end(function (compensationSaveErr, compensationSaveRes) {
            // Set message assertion
            (compensationSaveRes.body.message).should.match('Please fill Compensation name');

            // Handle Compensation save error
            done(compensationSaveErr);
          });
      });
  });

  it('should be able to update an Compensation if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Compensation
        agent.post('/api/compensations')
          .send(compensation)
          .expect(200)
          .end(function (compensationSaveErr, compensationSaveRes) {
            // Handle Compensation save error
            if (compensationSaveErr) {
              return done(compensationSaveErr);
            }

            // Update Compensation name
            compensation.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Compensation
            agent.put('/api/compensations/' + compensationSaveRes.body._id)
              .send(compensation)
              .expect(200)
              .end(function (compensationUpdateErr, compensationUpdateRes) {
                // Handle Compensation update error
                if (compensationUpdateErr) {
                  return done(compensationUpdateErr);
                }

                // Set assertions
                (compensationUpdateRes.body._id).should.equal(compensationSaveRes.body._id);
                (compensationUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Compensations if not signed in', function (done) {
    // Create new Compensation model instance
    var compensationObj = new Compensation(compensation);

    // Save the compensation
    compensationObj.save(function () {
      // Request Compensations
      request(app).get('/api/compensations')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Compensation if not signed in', function (done) {
    // Create new Compensation model instance
    var compensationObj = new Compensation(compensation);

    // Save the Compensation
    compensationObj.save(function () {
      request(app).get('/api/compensations/' + compensationObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', compensation.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Compensation with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/compensations/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Compensation is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Compensation which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Compensation
    request(app).get('/api/compensations/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Compensation with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Compensation if signed in', function (done) {
    agent.post('/api/auth/signin')
      .send(credentials)
      .expect(200)
      .end(function (signinErr, signinRes) {
        // Handle signin error
        if (signinErr) {
          return done(signinErr);
        }

        // Get the userId
        var userId = user.id;

        // Save a new Compensation
        agent.post('/api/compensations')
          .send(compensation)
          .expect(200)
          .end(function (compensationSaveErr, compensationSaveRes) {
            // Handle Compensation save error
            if (compensationSaveErr) {
              return done(compensationSaveErr);
            }

            // Delete an existing Compensation
            agent.delete('/api/compensations/' + compensationSaveRes.body._id)
              .send(compensation)
              .expect(200)
              .end(function (compensationDeleteErr, compensationDeleteRes) {
                // Handle compensation error error
                if (compensationDeleteErr) {
                  return done(compensationDeleteErr);
                }

                // Set assertions
                (compensationDeleteRes.body._id).should.equal(compensationSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Compensation if not signed in', function (done) {
    // Set Compensation user
    compensation.user = user;

    // Create new Compensation model instance
    var compensationObj = new Compensation(compensation);

    // Save the Compensation
    compensationObj.save(function () {
      // Try deleting Compensation
      request(app).delete('/api/compensations/' + compensationObj._id)
        .expect(403)
        .end(function (compensationDeleteErr, compensationDeleteRes) {
          // Set message assertion
          (compensationDeleteRes.body.message).should.match('User is not authorized');

          // Handle Compensation error error
          done(compensationDeleteErr);
        });

    });
  });

  it('should be able to get a single Compensation that has an orphaned user reference', function (done) {
    // Create orphan user creds
    var _creds = {
      username: 'orphan',
      password: 'M3@n.jsI$Aw3$0m3'
    };

    // Create orphan user
    var _orphan = new User({
      firstName: 'Full',
      lastName: 'Name',
      displayName: 'Full Name',
      email: 'orphan@test.com',
      username: _creds.username,
      password: _creds.password,
      provider: 'local'
    });

    _orphan.save(function (err, orphan) {
      // Handle save error
      if (err) {
        return done(err);
      }

      agent.post('/api/auth/signin')
        .send(_creds)
        .expect(200)
        .end(function (signinErr, signinRes) {
          // Handle signin error
          if (signinErr) {
            return done(signinErr);
          }

          // Get the userId
          var orphanId = orphan._id;

          // Save a new Compensation
          agent.post('/api/compensations')
            .send(compensation)
            .expect(200)
            .end(function (compensationSaveErr, compensationSaveRes) {
              // Handle Compensation save error
              if (compensationSaveErr) {
                return done(compensationSaveErr);
              }

              // Set assertions on new Compensation
              (compensationSaveRes.body.name).should.equal(compensation.name);
              should.exist(compensationSaveRes.body.user);
              should.equal(compensationSaveRes.body.user._id, orphanId);

              // force the Compensation to have an orphaned user reference
              orphan.remove(function () {
                // now signin with valid user
                agent.post('/api/auth/signin')
                  .send(credentials)
                  .expect(200)
                  .end(function (err, res) {
                    // Handle signin error
                    if (err) {
                      return done(err);
                    }

                    // Get the Compensation
                    agent.get('/api/compensations/' + compensationSaveRes.body._id)
                      .expect(200)
                      .end(function (compensationInfoErr, compensationInfoRes) {
                        // Handle Compensation error
                        if (compensationInfoErr) {
                          return done(compensationInfoErr);
                        }

                        // Set assertions
                        (compensationInfoRes.body._id).should.equal(compensationSaveRes.body._id);
                        (compensationInfoRes.body.name).should.equal(compensation.name);
                        should.equal(compensationInfoRes.body.user, undefined);

                        // Call the assertion callback
                        done();
                      });
                  });
              });
            });
        });
    });
  });

  afterEach(function (done) {
    User.remove().exec(function () {
      Compensation.remove().exec(done);
    });
  });
});
