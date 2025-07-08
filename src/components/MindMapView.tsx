import React, { useCallback, useState } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  Node,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Brain, Plus, Target } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface Goal {
  id: number;
  title: string;
  progress: number;
  milestones: number;
  completed: number;
}

interface MindMapViewProps {
  goals: Goal[];
  isEditing: boolean;
  onToggleEdit: () => void;
}

const initialNodes: Node[] = [
  {
    id: 'center',
    type: 'default',
    position: { x: 250, y: 150 },
    data: { label: 'Personal Growth Journey' },
    style: {
      background: '#10b981',
      color: 'white',
      border: '2px solid #059669',
      borderRadius: '50%',
      width: 150,
      height: 150,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '14px',
      fontWeight: 'bold',
    },
  },
];

const initialEdges: Edge[] = [];

export function MindMapView({ goals, isEditing, onToggleEdit }: MindMapViewProps) {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const { toast } = useToast();

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  React.useEffect(() => {
    // Update nodes based on goals
    const goalNodes: Node[] = goals.map((goal, index) => {
      const angle = (index * 2 * Math.PI) / goals.length;
      const radius = 200;
      const x = 250 + radius * Math.cos(angle);
      const y = 150 + radius * Math.sin(angle);

      return {
        id: `goal-${goal.id}`,
        type: 'default',
        position: { x: x - 75, y: y - 50 },
        data: { 
          label: goal.title,
          progress: goal.progress,
        },
        style: {
          background: goal.progress > 50 ? '#3b82f6' : '#6b7280',
          color: 'white',
          border: '2px solid #374151',
          borderRadius: '8px',
          width: 150,
          height: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '12px',
          textAlign: 'center',
          padding: '8px',
        },
      };
    });

    const goalEdges: Edge[] = goals.map((goal) => ({
      id: `edge-${goal.id}`,
      source: 'center',
      target: `goal-${goal.id}`,
      animated: true,
      style: { stroke: '#10b981', strokeWidth: 2 },
    }));

    setNodes([initialNodes[0], ...goalNodes]);
    setEdges(goalEdges);
  }, [goals, setNodes, setEdges]);

  const addNewNode = () => {
    const newNode: Node = {
      id: `custom-${Date.now()}`,
      type: 'default',
      position: { x: Math.random() * 300 + 100, y: Math.random() * 200 + 100 },
      data: { label: 'New Idea' },
      style: {
        background: '#8b5cf6',
        color: 'white',
        border: '2px solid #7c3aed',
        borderRadius: '8px',
        width: 120,
        height: 80,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '12px',
      },
    };
    setNodes((nds) => [...nds, newNode]);
    toast({
      title: "Node Added",
      description: "New idea node created. You can drag it around and connect it to other nodes.",
    });
  };

  if (goals.length === 0) {
    return (
      <Card className="h-96">
        <CardContent className="h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-green-50">
          <div className="text-center">
            <Brain className="h-16 w-16 text-blue-500 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-800 mb-2">Mind Map Coming Soon</h3>
            <p className="text-gray-600 mb-4">Add some goals first to see them visualized in your mind map</p>
            <div className="flex items-center gap-2 justify-center">
              <Target className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-gray-600">Start by creating your first goal</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-96">
      <CardContent className="h-full p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium">Interactive Mind Map</h3>
          <div className="flex gap-2">
            {isEditing && (
              <Button
                size="sm"
                onClick={addNewNode}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4 mr-1" />
                Add Node
              </Button>
            )}
            <Button
              size="sm"
              variant={isEditing ? "default" : "outline"}
              onClick={onToggleEdit}
            >
              <Brain className="h-4 w-4 mr-1" />
              {isEditing ? "Done" : "Edit"}
            </Button>
          </div>
        </div>
        <div className="h-80 border rounded-lg overflow-hidden">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
            attributionPosition="bottom-right"
          >
            <MiniMap />
            <Controls />
            <Background gap={12} size={1} />
          </ReactFlow>
        </div>
      </CardContent>
    </Card>
  );
}