javascript:(async function(){

    //domain check, can be skipped if need be
    if (location.host !== 'SOMEDOMAIN') return alert('[PRODUCTNAME Bootloader] Invalid Domain');

    try {
        let itemName = 'PRODUCTNAME_bootloader',
            stored = localStorage.getItem(itemName),

        //fetch a string from the server
        _fetch = path => new Promise(Resolve => fetch('https://UPDATE-SERVER-URL.example.com/' + path).then(res => res.text()).then(Resolve)),
        
        version = await _fetch('version'),

        //updates the client
        update = async() => {
            stored[1] = await _fetch('code');
            localStorage.setItem(itemName, JSON.stringify(stored));
        };

        //this is not the first time it has been run, but are we still up to date?
        if (stored) {
            stored = JSON.parse(stored);
            
            //we are not up to date, lets update
            if (stored[0] !== version) {
                stored[0] = version;
                await update();
            }

        //if this is the first time that the bootloader has been run
        } else {
            stored = [version];
            await update();
        }

        //we are done, time to run it
        eval(stored[1]);

    //if an error happened, make an alert about it
    } catch (err) {
        alert('[PRODCTNAME Bootloader] An error appeared:\n' + err.message);
    }
})();
