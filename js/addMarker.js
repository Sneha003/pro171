AFRAME.registerComponent("addingmarkers", {
  init: async function () {
    var toys = await this.getToys();
    console.log(toys)

    var mainScene = document.querySelector("#main-scene");

    toys.map(toy => {
        var marker = document.createElement("a-marker");
        marker.setAttribute("id", toy.id);
        marker.setAttribute("type", "pattern");
        marker.setAttribute("url", toy.marker_pattern_url);
        marker.setAttribute("cursor", {
          rayOrigin: "mouse"
        });
        marker.setAttribute("createmarkers", {});
        mainScene.appendChild(marker);
        

        //adding 3d model

        var model=document.createElement("a-entity");
        model.setAttribute("id", `model-${toy.id}`);
        model.setAttribute("position", toy.model_geometry.position);
        model.setAttribute("rotation", toy.model_geometry.rotation);
        model.setAttribute("scale", toy.model_geometry.scale);
        model.setAttribute("gltf-model", `url(${toy.model_url})`);
        model.setAttribute("gesture-handler", {});
        model.setAttribute("animation-mixer", {});
        model.setAttribute("visible", false);
        marker.appendChild(model);

        var mainPlane = document.createElement("a-plane");
        mainPlane.setAttribute("id", `main-plane-${toy.id}`);
        mainPlane.setAttribute("position", { x: 0, y: 0, z: 0 });
        mainPlane.setAttribute("rotation", { x: -90, y: 0, z: 0 });
        mainPlane.setAttribute("width", 2.3);
        mainPlane.setAttribute("height", 2.5);
        mainPlane.setAttribute("visible",true)
        mainPlane.setAttribute("material",{color:"#ffd880"})
        marker.appendChild(mainPlane);

        var titlePlane = document.createElement("a-plane");
        titlePlane.setAttribute("id", `title-plane-${toy.id}`);
        titlePlane.setAttribute("position", { x: 0, y: 1.1, z: 0.1 });
        titlePlane.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        titlePlane.setAttribute("width",2.31);
        titlePlane.setAttribute("height", 0.4);
        titlePlane.setAttribute("material", { color: "#f14668" });
        mainPlane.appendChild(titlePlane);

        var toyTitle = document.createElement("a-entity");
        toyTitle.setAttribute("id", `toy-title-${toy.id}`);
        toyTitle.setAttribute("position", { x: 1.3, y: 0, z: 0.1 });
        toyTitle.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        toyTitle.setAttribute("text", {
          font: "aileronsemibold",
          color: "#290149",
          width: 4.5,
          height: 3,
          align: "left",
          value: toy.toy_name
        });
        titlePlane.appendChild(toyTitle);

        var toyDescription = document.createElement("a-entity");
        toyDescription.setAttribute("id", `toyDescription-${toy.id}`);
        toyDescription.setAttribute("position", { x: 0.1, y: 0, z: 0.1 });
        toyDescription.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        toyDescription.setAttribute("text", {
          font: "aileronsemibold",
          color: "#6b011f",
          width: 2,
          height: 5,
          align: "left",
          value: toy.description,
          letterSpacing:2,
          lineHeight:50


        });
        mainPlane.appendChild(toyDescription);

        var toyAge = document.createElement("a-entity");
        toyAge.setAttribute("id", `toyAge-${toy.id}`);
        toyAge.setAttribute("position", { x: -0.75, y: -0.8, z: 0.1 });
        toyAge.setAttribute("rotation", { x: 0, y: 0, z: 0 });
        toyAge.setAttribute("text", {
          font: "aileronsemibold",
          color: "#290149",
          width: 2,
          height: 5,
          align: "center",
          value: `age:${toy.age_group}`,
          
          


        });
        mainPlane.appendChild(toyAge);





        console.log(marker)

    })
  
  },



  getToys: async function () {
    return await firebase.firestore()
      .collection("toys")
      .get()
      .then((snapshot) => {
        return snapshot.docs.map(doc => doc.data());
      });
  },
});
