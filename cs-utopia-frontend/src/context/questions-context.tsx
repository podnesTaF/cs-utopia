import React, { createContext, useState } from "react";
import {CustomTheme} from "@/styles/theme";
import {IQuestion} from "@/models/IQuestion";

export type QuestionsContextProps = {
    questions: IQuestion[];
    addQuestions: (questions: IQuestion[]) => void;
};

export const QuestionsContext = createContext<QuestionsContextProps>({
    questions: [],
    addQuestions: () => {},
});

export const QuestionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [questions, setQuestions] = useState<any>(CustomTheme);

    const addQuestions = (theme: any) => {
        setQuestions(theme);
    };

    const contextValue = {
        questions,
        addQuestions,
    };

    return <QuestionsContext.Provider value={contextValue}>{children}</QuestionsContext.Provider>;
};

