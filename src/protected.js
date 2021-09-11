import React from "react";
import { Route, Redirect } from "react-router-dom";


export const ProtectedRoute = ({
  component: Component,
  ...rest
}) => {
    let data=localStorage.getItem("userdetail");
        data= JSON.parse(data);
       
        if (data != null) {
         
          
          console.log(rest.value);
            if(data.permission===rest.value)
               { 
               return (
                <Route
                      {...rest}
                                 render={props => {
                                                    return <Component {...props} />;
                                                }}
                />
                );}

                 else{   
                    return (
                        <Route
                              {...rest}
                          
                       render={props => { return <Redirect to={{
                                                              pathname:"/",
                                                              state: {
                                                                      from: props.location
                                                                      }
                                                              }}
                      />;
                  }}/>
                    );
              }
            }  
        else{                                       
          return (
              <Route
                    {...rest}
             render={props => { return <Redirect to={{
                                                    pathname: "/",
                                                    state: {
                                                            from: props.location
                                                            }
                                                    }}
            />;
        }}/>
          );
    }
}             
      
   
