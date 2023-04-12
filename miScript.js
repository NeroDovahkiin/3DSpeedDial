/*function startDownload() {
	let imageURL = "file:///C:/Users/NERO/Desktop/Three speed dial/crate.gif";

	downloadedImg = new Image;
	downloadedImg.crossOrigin = "Anonymous";
	downloadedImg.src = imageURL;
}

startDownload();

document.body.appendChild(downloadedImg);
*/
let camera, scene, renderer;
let mesh;

init();
animate();

function init() {

	camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 10000);
	camera.position.set(0, 250, 1000);

	scene = new THREE.Scene();

	const texture = new THREE.TextureLoader().load('crate.gif');
	const texFb = new THREE.TextureLoader().load('fb.png');
	const texMl = new THREE.TextureLoader().load('ml.png');
	const texYt = new THREE.TextureLoader().load('yt.png');
	const texOca = new THREE.TextureLoader().load('oca.png');
	const texOutlook = new THREE.TextureLoader().load('outlook.png');
	const texGoogle = new THREE.TextureLoader().load('google.png');

	const geometry = new THREE.BoxGeometry(200, 200, 200);
	const material = new THREE.MeshBasicMaterial({ map: texture });
	const matFb = new THREE.MeshBasicMaterial({ map: texFb });
	const matMl = new THREE.MeshBasicMaterial({ map: texMl });
	const matYt = new THREE.MeshBasicMaterial({ map: texYt });
	const matOca = new THREE.MeshBasicMaterial({ map: texOca });
	const matOutlook = new THREE.MeshBasicMaterial({ map: texOutlook });
	const matGoogle = new THREE.MeshBasicMaterial({ map: texGoogle });

	mesh = new THREE.Mesh(geometry, matMl);
	mesh2 = new THREE.Mesh(geometry, matFb);
	mesh3 = new THREE.Mesh(geometry, material);
	mesh4 = new THREE.Mesh(geometry, matYt);
	mesh5 = new THREE.Mesh(geometry, material);
	mesh6 = new THREE.Mesh(geometry, matOutlook);
	mesh7 = new THREE.Mesh(geometry, matOca);
	mesh8 = new THREE.Mesh(geometry, material);
	mesh9 = new THREE.Mesh(geometry, matGoogle);
	mesh2.position.x = 200;
	mesh2.position.y = 200;
	mesh3.position.x = 200;
	mesh4.position.z = 200;
	mesh4.position.x = 200;
	mesh5.position.x = 400;
	mesh6.position.x = 800;
	mesh7.position.x = -400;
	mesh8.position.x = -200;
	mesh9.position.z = -200;

	scene.add(mesh, mesh2, mesh3, mesh4, mesh5, mesh6, mesh7, mesh8, mesh9);
	//

	window.addEventListener('dblclick', onDocumentMouseDown, false);
	window.addEventListener('click', prueba, false);
	var raycaster = new THREE.Raycaster();
	var mouse = new THREE.Vector2();
	function onDocumentMouseDown(event) {
		event.preventDefault();
		mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
		mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
		raycaster.setFromCamera(mouse, camera);

		var intersects = raycaster.intersectObjects(scene.children);
		console.log(intersects);

		if (intersects.length > 0) {
			intersects[0].object.callback();
		}
	}

	// sporote a la tecla control
	function prueba(event) {
		if (event.ctrlKey) {

			event.preventDefault();
			mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
			mouse.y = - (event.clientY / renderer.domElement.clientHeight) * 2 + 1;
			raycaster.setFromCamera(mouse, camera);

			var intersects = raycaster.intersectObjects(scene.children);
			console.log(intersects);

			if (intersects.length > 0) {
				intersects[0].object.callback(1);
			}
		}
	}

	mesh.callback = function (param) {
		console.log("MERCADO LIBRE clickeado");
		if (param == 1) {
			window.open("https://mercadolibre.com.uy/");
		} else {
			location.href = "https://mercadolibre.com.uy/";
		}
	}
	mesh2.callback = function (param) {
		if (param == 1) {
			window.open("https://facebook.com/");
		} else {
			location.href = "https://facebook.com/";
		}
	}
	mesh3.callback = function () { console.log("Caja Madera clickeado"); }
	mesh4.callback = function (param) {
		if (param == 1) {
			window.open("https://youtube.com/");
		} else {
			location.href = "https://youtube.com/";
		}
	}
	mesh6.callback = function (param) {
		if (param == 1) {
			window.open("https://outlook.live.com/mail/0/inbox");
		} else {
			location.href = "https://outlook.live.com/mail/0/inbox";
		}
	}
	mesh7.callback = function (param) {
		if (param == 1) {
			window.open("https://micuentanuevo.oca.com.uy/trx/login");
		} else {
			location.href = "https://micuentanuevo.oca.com.uy/trx/login";
		}
	}
	mesh9.callback = function (param) {
		if (param == 1) {
			window.open("https://google.com");
		} else {
			location.href = "https://google.com";
		}
	}

	//
	const ambientLight = new THREE.AmbientLight(0xcccccc, 0.2);
	scene.add(ambientLight);

	//
	const helper = new THREE.GridHelper(2000, 100);
	helper.position.y = -100;
	helper.material.opacity = 0.25;
	helper.material.transparent = true;
	scene.add(helper);
	helper.callback = function () { console.log("grid clicked"); }
	//
	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);
	document.body.appendChild(renderer.domElement);

	//
	controls = new THREE.OrbitControls(camera, renderer.domElement);
	//controls.enableZoom = false;
	controls.enabled = true;
	//	controls.enablePan = false; // movimiento lateral
	controls.minDistance = 800.0;
	controls.maxDistance = 2000.0;
	controls.minPolarAngle = -Math.PI / 2;
	controls.maxPolarAngle = Math.PI / 2;

	controls.update();

	window.addEventListener('resize', onWindowResize);
}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(window.innerWidth, window.innerHeight);

}

function animate() {

	requestAnimationFrame(animate);
	/*
					mesh.rotation.x += 0.005;
					mesh.rotation.y += 0.01;
	*/
	renderer.render(scene, camera);

}