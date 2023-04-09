package com.IP3G11.Best11.controllers;

import com.IP3G11.Best11.tools.ModelClassifier;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import weka.core.Instances;

@CrossOrigin(origins = "http://localhost:3000")
@Controller
public class ModelController {

    //Test for predictive model. should print an 'A' or 'H' to the console
    @GetMapping("model/test")
    public void testModel(){
        ModelClassifier mc = new ModelClassifier();
        Instances inst = mc.createInstance(1
                , 2.1
                , 1.5
                , 0.45
                , 1.2
                , 1.7
                , 1.4
                , 1.3
        );
        System.out.println(mc.Classify(inst));
    }

}
