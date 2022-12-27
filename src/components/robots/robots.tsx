import { useCallback, useState, useEffect } from "react";
import { RobotType } from "../../model/robot.model";
import { RobotsRepo } from "../../repository/robots.repo";
import { Add } from "../robot.add/add";
import { Robot } from "../robot/robot";
import "./robots.scss";

export function Robots() {
    const repo = new RobotsRepo();
    const initialState: Array<RobotType> = [];

    const [robots, setRobots] = useState(initialState);

    const handleLoad = async () => {
        const data = await repo.load();
        setRobots(data);
    };

    useEffect(() => {
        handleLoad();
    }, []);

    const handleAdd = async function (robot: RobotType) {
        setRobots([...robots, robot]);
        await repo.create(robot);
    };

    const handleUpdate = async function (robot: Partial<RobotType>) {
        setRobots(
            robots.map((item) =>
                item.id === robot.id ? { ...item, ...robot } : item
            )
        );
        await repo.update(robot);
    };

    const handleDelete = async function (id: RobotType["id"]) {
        setRobots(robots.filter((item) => item.id !== id));
        await repo.delete(id);
    };
    return (
        <>
            <Add handleAdd={handleAdd}></Add>
            <ul className="robots-list">
                {robots.map((item) => {
                    return (
                        <Robot
                            key={item.id}
                            item={item}
                            handleUpdate={handleUpdate}
                            handleDelete={handleDelete}
                        ></Robot>
                    );
                })}
            </ul>
        </>
    );
}
