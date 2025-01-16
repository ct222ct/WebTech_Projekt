import './polyfills.server.mjs';
import {
  CommonModule,
  HttpClient,
  NgForOf,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵinject,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-6IWAD46D.mjs";
import "./chunk-DTEGX4RB.mjs";

// src/app/vehicle-marketplace/vehicle-marketplace.service.ts
var VehicleMarketplaceService = class _VehicleMarketplaceService {
  http;
  apiUrl = "http://localhost:3000/api/vehicles";
  constructor(http) {
    this.http = http;
  }
  getCategories() {
    return this.http.get(`${this.apiUrl}/categories`);
  }
  getMarks(categoryId) {
    return this.http.get(`${this.apiUrl}/marks/${categoryId}`);
  }
  getModels(markId) {
    return this.http.get(`${this.apiUrl}/models/${markId}`);
  }
  getVehicleTypes(categoryId) {
    return this.http.get(`${this.apiUrl}/vehicle-types/${categoryId}`);
  }
  static \u0275fac = function VehicleMarketplaceService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VehicleMarketplaceService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _VehicleMarketplaceService, factory: _VehicleMarketplaceService.\u0275fac, providedIn: "root" });
};

// src/app/vehicle-marketplace/vehicle-marketplace.component.ts
function VehicleMarketplaceComponent_option_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const category_r1 = ctx.$implicit;
    \u0275\u0275property("value", category_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(category_r1.name);
  }
}
function VehicleMarketplaceComponent_option_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const mark_r2 = ctx.$implicit;
    \u0275\u0275property("value", mark_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(mark_r2.name);
  }
}
function VehicleMarketplaceComponent_option_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const model_r3 = ctx.$implicit;
    \u0275\u0275property("value", model_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(model_r3.name);
  }
}
function VehicleMarketplaceComponent_option_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "option", 9);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const type_r4 = ctx.$implicit;
    \u0275\u0275property("value", type_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(type_r4.name);
  }
}
var VehicleMarketplaceComponent = class _VehicleMarketplaceComponent {
  vehicleService;
  categories = [];
  marks = [];
  models = [];
  vehicleTypes = [];
  selectedCategory = null;
  selectedMark = null;
  selectedModel = null;
  selectedType = null;
  constructor(vehicleService) {
    this.vehicleService = vehicleService;
  }
  ngOnInit() {
    this.vehicleService.getCategories().subscribe((categories) => {
      this.categories = categories;
    });
  }
  onCategoryChange(event) {
    const target = event.target;
    const categoryId = Number(target.value);
    this.selectedCategory = categoryId;
    this.vehicleService.getMarks(categoryId).subscribe((marks) => {
      this.marks = marks;
    });
    this.vehicleService.getVehicleTypes(categoryId).subscribe((types) => {
      this.vehicleTypes = types;
    });
  }
  onMarkChange(event) {
    const target = event.target;
    const markId = Number(target.value);
    this.selectedMark = markId;
    this.vehicleService.getModels(markId).subscribe((models) => {
      this.models = models;
    });
  }
  static \u0275fac = function VehicleMarketplaceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VehicleMarketplaceComponent)(\u0275\u0275directiveInject(VehicleMarketplaceService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VehicleMarketplaceComponent, selectors: [["app-vehicle-marketplace"]], decls: 20, vars: 4, consts: [["for", "category"], ["id", "category", 3, "change"], [3, "value", 4, "ngFor", "ngForOf"], ["for", "mark"], ["id", "mark", 3, "change"], ["for", "model"], ["id", "model"], ["for", "type"], ["id", "type"], [3, "value"]], template: function VehicleMarketplaceComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div")(1, "h1");
      \u0275\u0275text(2, "Vehicle Marketplace");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "form")(4, "label", 0);
      \u0275\u0275text(5, "Category:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "select", 1);
      \u0275\u0275listener("change", function VehicleMarketplaceComponent_Template_select_change_6_listener($event) {
        return ctx.onCategoryChange($event);
      });
      \u0275\u0275template(7, VehicleMarketplaceComponent_option_7_Template, 2, 2, "option", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "label", 3);
      \u0275\u0275text(9, "Mark:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "select", 4);
      \u0275\u0275listener("change", function VehicleMarketplaceComponent_Template_select_change_10_listener($event) {
        return ctx.onMarkChange($event);
      });
      \u0275\u0275template(11, VehicleMarketplaceComponent_option_11_Template, 2, 2, "option", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "label", 5);
      \u0275\u0275text(13, "Model:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "select", 6);
      \u0275\u0275template(15, VehicleMarketplaceComponent_option_15_Template, 2, 2, "option", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "label", 7);
      \u0275\u0275text(17, "Type:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "select", 8);
      \u0275\u0275template(19, VehicleMarketplaceComponent_option_19_Template, 2, 2, "option", 2);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275property("ngForOf", ctx.categories);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngForOf", ctx.marks);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngForOf", ctx.models);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngForOf", ctx.vehicleTypes);
    }
  }, dependencies: [CommonModule, NgForOf], styles: ["\n\nform[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\nlabel[_ngcontent-%COMP%] {\n  font-weight: bold;\n}\nselect[_ngcontent-%COMP%] {\n  padding: 0.5rem;\n  font-size: 1rem;\n}\n/*# sourceMappingURL=vehicle-marketplace.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VehicleMarketplaceComponent, { className: "VehicleMarketplaceComponent", filePath: "vehicle-marketplace/vehicle-marketplace.component.ts", lineNumber: 15 });
})();
export {
  VehicleMarketplaceComponent
};
//# sourceMappingURL=chunk-VAZZTGUM.mjs.map
