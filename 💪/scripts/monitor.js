let device = $objc("UIDevice").$currentDevice();
let notificationCenter = $objc("NSNotificationCenter").$defaultCenter();
let notificationName = "UIDeviceProximityStateDidChangeNotification";

$define({
    type: "ProximityMonitor: NSObject",
    props: ["handler"],
    events: {
        "stateDidChange:": note => {
            let state = device.$proximityState();
            self.$handler()(state);
        }
    }
});

let monitor = $objc("ProximityMonitor").$new();
$objc_retain(monitor);

function setProximityMonitorEnabled(enabled, handler) {

    device.$setProximityMonitoringEnabled(enabled);
    monitor.$setHandler(handler);

    if (enabled) {
        notificationCenter.$addObserver_selector_name_object(monitor, "stateDidChange:", notificationName, null);
    } else {
        notificationCenter.$removeObserver_name_object(monitor, notificationName, null);
    }
}
module.exports = {
    setProximityMonitorEnabled: setProximityMonitorEnabled,
}