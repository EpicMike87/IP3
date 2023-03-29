package com.IP3G11.Best11.tools;

import weka.classifiers.Classifier;
import weka.classifiers.functions.Logistic;
import weka.core.Attribute;
import weka.core.DenseInstance;
import weka.core.Instances;
import weka.core.SerializationHelper;

import java.util.ArrayList;

public class ModelClassifier {

    private final String MODEL_PATH = "./mlmodel/logreg-71.35.model";

    private Attribute homeAtkL20;
    private Attribute awayAtkL20;
    private Attribute homeDefL20;
    private Attribute awayDefL20;
    private Attribute homeFormL20;
    private Attribute awayFormL20;
    private Attribute homeDefL10;
    private Attribute homeFormL10;

    private ArrayList attributes;
    private ArrayList classVal;
    private Instances dataRaw;

    public ModelClassifier() {

        homeAtkL20 = new Attribute("HomeAtkL20");
        awayAtkL20 = new Attribute("AwayAtkL20");
        homeDefL20 = new Attribute("HomeDefL20");
        awayDefL20 = new Attribute("AwayDefL20");
        homeFormL20 = new Attribute("HomeFormL20");
        awayFormL20 = new Attribute("AwayFormL20");
        homeDefL10 = new Attribute("HomeDefL10");
        homeFormL10 = new Attribute("HomeFormL10");
        attributes = new ArrayList();
        classVal = new ArrayList();
        classVal.add("H");
        classVal.add("A");


        attributes.add(homeAtkL20);
        attributes.add(awayAtkL20);
        attributes.add(homeDefL20);
        attributes.add(awayDefL20);
        attributes.add(homeFormL20);
        attributes.add(awayFormL20);
        attributes.add(homeDefL10);
        attributes.add(homeFormL10);

        attributes.add(new Attribute("class", classVal));
        dataRaw = new Instances("TestInstances", attributes, 0);
        dataRaw.setClassIndex(dataRaw.numAttributes()-1);
    }


    public Instances createInstance(double homeAtkL20, double awayAtkL20, double homeDefL20, double awayDefL20,
                                    double homeFormL20,
                                    double awayFormL20, double homeDefL10, double homeFormL10) {
        dataRaw.clear();
        double[] instanceValue1 = new double[]{homeAtkL20, awayAtkL20, homeDefL20, awayDefL20, homeFormL20, awayFormL20, homeDefL10, homeFormL10,0};
        dataRaw.add(new DenseInstance(1.0, instanceValue1));
        return dataRaw;
    }


    public String Classify(Instances insts) {
        String result = "Not classified.";
        Classifier cls;
        try {
            cls = (Logistic) SerializationHelper.read(MODEL_PATH);
            result = classVal.get((int) cls.classifyInstance(insts.firstInstance())).toString();
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return result;
    }


    public Instances getInstance() {
        return dataRaw;
    }

}

