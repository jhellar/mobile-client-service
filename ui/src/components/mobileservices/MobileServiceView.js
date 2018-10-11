import React, { Component } from 'react';
import BoundServiceRow from './BoundServiceRow';
import UnboundServiceRow from './UnboundServiceRow';
import DataService from '../../DataService';
import BindingPanel from "./BindingPanel"

class MobileServiceView extends Component {
  constructor(props) {
    super(props);
    
    DataService.bindableServices().then(
      
      instances => {
            let unboundServices = [];
            let boundServices = [];
             instances.forEach ( instance => {
                let serviceName = instance.name;
                let serviceIcon = instance.imageUrl;
                let serviceIconClass = instance.iconClass;
                
                if (instance.isBound) {
                  
                  boundServices.push({
                    serviceLogoUrl: serviceIcon,
                    serviceIconClass: serviceIconClass,
                    serviceName: serviceName,
                    serviceId: serviceName,
                    serviceDescription: instance.serviceClass.spec.description,
                    documentationUrl: instance.serviceClass.spec.externalMetadata.documentationUrl20,
                    setupText: 'Identity Management SDK setup',            
                  });
                } else {
                  unboundServices.push({
                    serviceLogoUrl: serviceIcon,
                    serviceIconClass: serviceIconClass,
                    serviceName: serviceName,
                    serviceId: serviceName,
                    bindingSchema : instance.servicePlan.spec.serviceBindingCreateParameterSchema,
                    serviceDescription: instance.serviceClass.spec.description,
                    setupText: 'Mobile Metrics SDK setups',
                  });
                }
                
                this.state.boundServices = boundServices;
                this.state.unboundServices = unboundServices;
                this.setState(this.state);
            })
          }
        );
      
    this.state = {
      boundServices: [],
      unboundServices: [],
    };

    this.boundServiceRows = this.boundServiceRows.bind(this);
    this.unboundServiceRows = this.unboundServiceRows.bind(this);
    this.showBindingDialog = this.showBindingDialog.bind(this);
  }

  boundServiceRows() {
    const rows = [];
    if (this.state.boundServices) {
      rows.push(<h2 key="bound-services">Bound Services</h2>);
      this.state.boundServices.forEach((service) => {
        rows.push(<BoundServiceRow key={service.serviceId} service={service} />);
      });
    }

    return rows;
  }

  unboundServiceRows() {
    const rows = [];
    
    if (this.state.unboundServices) {
      rows.push(<h2 key="unbound-services">Unbound Services</h2>);
      this.state.unboundServices.forEach((service) => {
        rows.push(<UnboundServiceRow key={service.serviceId} service={service} showBindingDialog={this.showBindingDialog} />);
      });
    }
    return rows;
  }

  showBindingDialog(serviceName, schema) {
    this.bindingDialog.show(serviceName, schema);
  }

  render() {
    return (
      <div>
        {this.boundServiceRows()}
        {this.unboundServiceRows()}
        <BindingPanel onRef= {(dialog)=>{this.bindingDialog = dialog; }}/>
      </div>
    );
  }
}

export default MobileServiceView;

