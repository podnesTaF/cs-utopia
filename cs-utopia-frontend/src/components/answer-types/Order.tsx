import { IAnswer } from "@/models/IAnswer";
import DragHandleOutlinedIcon from "@mui/icons-material/DragHandleOutlined";
import { ListItem, ListItemText } from "@mui/material";
import React, { useEffect, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

interface OrderProps {
  answers: IAnswer[];
  setSelection?: Function;
  questionId: number;
  userAnswer?: any;
  correctAnswer?: any;
}

const items = [
  { id: "1", text: "some text" },
  { id: "2", text: "some another text" },
  { id: "3", text: "third text" },
];

const Order: React.FC<OrderProps> = ({
  answers,
  setSelection,
  questionId,
  correctAnswer,
  userAnswer,
}) => {
  const [anrws, setAnrws] = useState<any[]>(
    userAnswer || answers.map((an) => ({ ...an, id: an.id + "" }))
  );

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  const handleDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }

    const sourceIndex = result.source.index;
    const destinationIndex = result.destination.index;

    // Remove the dragged item from its original position
    const [removedItem] = anrws.splice(sourceIndex, 1);

    // Insert the dragged item into its new position
    anrws.splice(destinationIndex, 0, removedItem);

    // Update the state with the new order of items
    setAnrws([...anrws]);
    if (setSelection) {
      setSelection((prev: any) => ({ ...prev, [questionId]: anrws }));
    }
  };

  if (!enabled) return null;

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="items">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {anrws.map((item, index) => {
              let isCorrect: null | boolean = null;
              isCorrect = item.position === index;
              return (
                <Draggable
                  key={item.id}
                  draggableId={item.id}
                  index={index}
                  isDragDisabled={!!userAnswer}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <ListItem
                        sx={{
                          borderBottom: "1px solid",
                          borderBottomColor: userAnswer
                            ? isCorrect
                              ? "success.main"
                              : "error.main"
                            : "#1E1E1E",
                        }}
                      >
                        <DragHandleOutlinedIcon sx={{ mr: 2 }} />
                        <ListItemText
                          sx={{
                            color: userAnswer
                              ? isCorrect
                                ? "success.main"
                                : "error.main"
                              : "text.primary",
                          }}
                          primary={item.text}
                        />
                      </ListItem>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default Order;
