'use strict';

var should = require('should'),
  request = require('supertest'),
  path = require('path'),
  mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Builder = mongoose.model('Builder'),
  express = require(path.resolve('./config/lib/express'));

/**
 * Globals
 */
var app,
  agent,
  credentials,
  user,
  builder;

/**
 * Builder routes tests
 */
describe('Builder CRUD tests', function () {

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

    // Save a user to the test db and create new Builder
    user.save(function () {
      builder = {
        name: 'Builder name'
      };

      done();
    });
  });

  it('should be able to save a Builder if logged in', function (done) {
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

        // Save a new Builder
        agent.post('/api/builders')
          .send(builder)
          .expect(200)
          .end(function (builderSaveErr, builderSaveRes) {
            // Handle Builder save error
            if (builderSaveErr) {
              return done(builderSaveErr);
            }

            // Get a list of Builders
            agent.get('/api/builders')
              .end(function (buildersGetErr, buildersGetRes) {
                // Handle Builders save error
                if (buildersGetErr) {
                  return done(buildersGetErr);
                }

                // Get Builders list
                var builders = buildersGetRes.body;

                // Set assertions
                (builders[0].user._id).should.equal(userId);
                (builders[0].name).should.match('Builder name');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to save an Builder if not logged in', function (done) {
    agent.post('/api/builders')
      .send(builder)
      .expect(403)
      .end(function (builderSaveErr, builderSaveRes) {
        // Call the assertion callback
        done(builderSaveErr);
      });
  });

  it('should not be able to save an Builder if no name is provided', function (done) {
    // Invalidate name field
    builder.name = '';

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

        // Save a new Builder
        agent.post('/api/builders')
          .send(builder)
          .expect(400)
          .end(function (builderSaveErr, builderSaveRes) {
            // Set message assertion
            (builderSaveRes.body.message).should.match('Please fill Builder name');

            // Handle Builder save error
            done(builderSaveErr);
          });
      });
  });

  it('should be able to update an Builder if signed in', function (done) {
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

        // Save a new Builder
        agent.post('/api/builders')
          .send(builder)
          .expect(200)
          .end(function (builderSaveErr, builderSaveRes) {
            // Handle Builder save error
            if (builderSaveErr) {
              return done(builderSaveErr);
            }

            // Update Builder name
            builder.name = 'WHY YOU GOTTA BE SO MEAN?';

            // Update an existing Builder
            agent.put('/api/builders/' + builderSaveRes.body._id)
              .send(builder)
              .expect(200)
              .end(function (builderUpdateErr, builderUpdateRes) {
                // Handle Builder update error
                if (builderUpdateErr) {
                  return done(builderUpdateErr);
                }

                // Set assertions
                (builderUpdateRes.body._id).should.equal(builderSaveRes.body._id);
                (builderUpdateRes.body.name).should.match('WHY YOU GOTTA BE SO MEAN?');

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should be able to get a list of Builders if not signed in', function (done) {
    // Create new Builder model instance
    var builderObj = new Builder(builder);

    // Save the builder
    builderObj.save(function () {
      // Request Builders
      request(app).get('/api/builders')
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Array).and.have.lengthOf(1);

          // Call the assertion callback
          done();
        });

    });
  });

  it('should be able to get a single Builder if not signed in', function (done) {
    // Create new Builder model instance
    var builderObj = new Builder(builder);

    // Save the Builder
    builderObj.save(function () {
      request(app).get('/api/builders/' + builderObj._id)
        .end(function (req, res) {
          // Set assertion
          res.body.should.be.instanceof(Object).and.have.property('name', builder.name);

          // Call the assertion callback
          done();
        });
    });
  });

  it('should return proper error for single Builder with an invalid Id, if not signed in', function (done) {
    // test is not a valid mongoose Id
    request(app).get('/api/builders/test')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'Builder is invalid');

        // Call the assertion callback
        done();
      });
  });

  it('should return proper error for single Builder which doesnt exist, if not signed in', function (done) {
    // This is a valid mongoose Id but a non-existent Builder
    request(app).get('/api/builders/559e9cd815f80b4c256a8f41')
      .end(function (req, res) {
        // Set assertion
        res.body.should.be.instanceof(Object).and.have.property('message', 'No Builder with that identifier has been found');

        // Call the assertion callback
        done();
      });
  });

  it('should be able to delete an Builder if signed in', function (done) {
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

        // Save a new Builder
        agent.post('/api/builders')
          .send(builder)
          .expect(200)
          .end(function (builderSaveErr, builderSaveRes) {
            // Handle Builder save error
            if (builderSaveErr) {
              return done(builderSaveErr);
            }

            // Delete an existing Builder
            agent.delete('/api/builders/' + builderSaveRes.body._id)
              .send(builder)
              .expect(200)
              .end(function (builderDeleteErr, builderDeleteRes) {
                // Handle builder error error
                if (builderDeleteErr) {
                  return done(builderDeleteErr);
                }

                // Set assertions
                (builderDeleteRes.body._id).should.equal(builderSaveRes.body._id);

                // Call the assertion callback
                done();
              });
          });
      });
  });

  it('should not be able to delete an Builder if not signed in', function (done) {
    // Set Builder user
    builder.user = user;

    // Create new Builder model instance
    var builderObj = new Builder(builder);

    // Save the Builder
    builderObj.save(function () {
      // Try deleting Builder
      request(app).delete('/api/builders/' + builderObj._id)
        .expect(403)
        .end(function (builderDeleteErr, builderDeleteRes) {
          // Set message assertion
          (builderDeleteRes.body.message).should.match('User is not authorized');

          // Handle Builder error error
          done(builderDeleteErr);
        });

    });
  });

  it('should be able to get a single Builder that has an orphaned user reference', function (done) {
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

          // Save a new Builder
          agent.post('/api/builders')
            .send(builder)
            .expect(200)
            .end(function (builderSaveErr, builderSaveRes) {
              // Handle Builder save error
              if (builderSaveErr) {
                return done(builderSaveErr);
              }

              // Set assertions on new Builder
              (builderSaveRes.body.name).should.equal(builder.name);
              should.exist(builderSaveRes.body.user);
              should.equal(builderSaveRes.body.user._id, orphanId);

              // force the Builder to have an orphaned user reference
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

                    // Get the Builder
                    agent.get('/api/builders/' + builderSaveRes.body._id)
                      .expect(200)
                      .end(function (builderInfoErr, builderInfoRes) {
                        // Handle Builder error
                        if (builderInfoErr) {
                          return done(builderInfoErr);
                        }

                        // Set assertions
                        (builderInfoRes.body._id).should.equal(builderSaveRes.body._id);
                        (builderInfoRes.body.name).should.equal(builder.name);
                        should.equal(builderInfoRes.body.user, undefined);

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
      Builder.remove().exec(done);
    });
  });
});
