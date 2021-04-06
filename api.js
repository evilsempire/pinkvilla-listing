(function () {
    
    const nodesEl = document.querySelector('.nodes');
    const loaderEl = document.querySelector('.loader');
    const results = document.querySelector('.results');

    // get the nodes from API
    const getNodes = async (page) => {
        const API_URL = `api.php?page=${page}`
        const response = await fetch(API_URL);
        // handle 404
        if (!response.ok) {
            throw new Error(`An error occurred: ${response.status}`);
        }
        return await response.json();
    }

    // show the node
    const showNodes = (nodes) => {
        try{

            const domain = "https://www.pinkvilla.com/";
        nodes.forEach(nodeObj => {
            const node = nodeObj.node;
            const nodeEl = document.createElement('div');
            nodeEl.classList.add('node');

            nodeEl.innerHTML = `
                <div class='node_picture'>
                <img class='node_photo' src='${domain}${node.field_photo_image_section}'/>
                </div>
                
                <div class='node_content'>
                <span class='node_content__title'>${node.title})</span>
                <div class='node_content__time'>1 Hour Ago</div>
                </div>
        `;

            nodesEl.appendChild(nodeEl);
        });
        }catch(err){
            console.log('Error while showing nodes',err)
        }
    };

    const hideLoader = () => {
        loaderEl.classList.remove('show');
    };

    const showLoader = () => {
        loaderEl.classList.add('show');
    };

    const hasMoreNodes = (page, limit, total) => {
        const startIndex = (page - 1) * limit + 1;
        return total === 0 || startIndex < total;
    };

    // load quotes
    const loadNodes = async (page, limit) => {

        // show the loader
        showLoader();

        // 0.5 second later
        setTimeout(async () => {
            try {
                // if having more nodes to fetch
                if (hasMoreNodes(page, limit, total)) {
                    // call the API to get nodes
                    const response = await getNodes(page);
                    // show nodes
                    showNodes(response.nodes);
                    // update the total
                    total = 100;
                }else{
                    const nodeEl = document.createElement('div');
                    nodeEl.innerHTML = `End of results!`
                    results.appendChild(nodeEl);
                }
            } catch (error) {
                console.log(error.message);
            } finally {
                hideLoader();
            }
        }, 500);

    };

    // control variables
    let currentPage = 1;
    let total = 100;
    let limit = 20;

    window.addEventListener('scroll', () => {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;

        if (scrollTop + clientHeight >= scrollHeight - 5 &&
            hasMoreNodes(currentPage, limit, total)) {
            currentPage++;
            loadNodes(currentPage, limit);
        }
    }, {
        passive: true
    });

    // initialize
    loadNodes(currentPage, limit);

})();