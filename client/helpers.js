/**
 * Created by steveovens on 1/08/2015.
 */
/**
 * Register displayTimeSince as a general helper that can be included from anywhere.
 *
 * displayTimeSince shows the time that has passed since a tweet was made e.g. "8 seconds ago"
 *
 * This is intentionally using a Session variable (wallTime) so that it is triggered reactively
 * on update of the Session variable. The timer function below is set up to update the wallTime clock
 * every second - which will trigger an update of the displayTimeSince.
 */
Template.registerHelper('displayTimeSince', function(ts) {
    if (!Session.get("wallTime")) Session.set("wallTime", moment(new Date()).unix());
    wallTime = Session.get("wallTime");

    if (ts && ts.hash && ts.hash.ts) {
        ts = ts.hash.ts;

        // MomentJS is phenomenal - however it shows all intervals under a minute as "a few seconds ago"
        // This little hack gives us a bit more precision for our intervals
        if (wallTime - ts < 60 && wallTime - ts > 4) {
            return (Math.round(wallTime - ts)) + ' seconds ago';
        }
        return moment.unix(ts).from(moment.unix(wallTime));
    }
    return 'moments ago'; // No timestamp or unable to determine
});

Meteor.startup( function() {
    // Initialise the 'wall time' clock for the client
    Session.set("wallTime", moment(new Date()).unix());

    Meteor.setInterval( function() {
        Session.set("wallTime", moment(new Date()).unix());
    }, 1000);
});